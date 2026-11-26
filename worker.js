/* Runs the model off the main thread. Photos never leave the device. */
importScripts('vendor/ort.wasm.min.js');

ort.env.wasm.wasmPaths = new URL('vendor/', self.location.href).href;
ort.env.wasm.numThreads = self.crossOriginIsolated
  ? Math.min(4, self.navigator.hardwareConcurrency || 2)
  : 1;

// Exact size of model/dinov2-small/model_quantized.onnx, as in sw.js. Update both if the model changes.
const MODEL_BYTES = 24427763;

let session, config, gallery, owners, classes;
let transform = null; // { mean, matrix }: the catalogue's projection, applied before comparing

/* Errors say which step failed, so the app can tell a cut connection from a phone that cannot run the model. */
class StepError extends Error {
  constructor(step, error) {
    super(String((error && error.message) || error));
    this.step = step;
  }
}

async function fetchOk(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
  return response;
}

/* Servers such as GitHub Pages compress the download, so its announced length is smaller than
   the file. The pieces are collected as they come, and progress uses the known file size. */
async function download(url, expected) {
  const response = await fetchOk(url);
  const announced = Number(response.headers.get('content-length')) || 0;
  const total = (!response.headers.get('content-encoding') && announced) || expected;
  if (!response.body) return new Uint8Array(await response.arrayBuffer());
  const reader = response.body.getReader();
  const chunks = [];
  let loaded = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    loaded += value.length;
    self.postMessage({ type: 'progress', loaded: Math.min(loaded, total), total });
  }
  const data = new Uint8Array(loaded);
  let offset = 0;
  for (const chunk of chunks) {
    data.set(chunk, offset);
    offset += chunk.length;
  }
  return data;
}

async function forgetSavedModel(url) {
  try {
    for (const key of await caches.keys()) {
      if (key.startsWith('pomologue-')) await (await caches.open(key)).delete(url, { ignoreSearch: true });
    }
  } catch (_) { /* nothing saved, or no storage: the next try downloads anyway */ }
}

async function init() {
  let url, model;
  try {
    config = await (await fetchOk('model/config.json')).json();
    gallery = new Int8Array(await (await fetchOk('model/gallery.bin')).arrayBuffer());
    if (gallery.length !== config.prototypes * config.dimensions) throw new Error('Gallery size mismatch');
    if (config.inputDimensions) {
      const raw = new Float32Array(await (await fetchOk('model/transform.bin')).arrayBuffer());
      if (raw.length !== config.inputDimensions * (1 + config.dimensions)) throw new Error('Transform size mismatch');
      transform = { mean: raw.subarray(0, config.inputDimensions), matrix: raw.subarray(config.inputDimensions) };
    }
    url = `model/${config.model}`;
    model = await download(url, MODEL_BYTES);
  } catch (error) {
    throw new StepError('download', error);
  }
  if (model.length !== MODEL_BYTES) {
    await forgetSavedModel(url);
    throw new StepError('download', `incomplete model (${model.length} of ${MODEL_BYTES} bytes)`);
  }
  owners = Int32Array.from(config.owners);
  classes = owners.reduce((max, owner) => Math.max(max, owner), -1) + 1;
  self.postMessage({ type: 'progress', loaded: 0, total: 0 }); // downloaded: now preparing
  try {
    session = await ort.InferenceSession.create(model, {
      executionProviders: ['wasm'],
      graphOptimizationLevel: 'all',
    });
  } catch (error) {
    // The engine file is fetched here, so a cut connection can still show up at this step.
    const network = /fetch|network|load failed|connection|aborted/i.test(String(error && error.message));
    throw new StepError(network ? 'download' : 'engine', error);
  }
  // Descriptions are only comparable when made by the same model with the same settings.
  const tag = `${config.model}|${config.feature}|${config.inputSize}`;
  self.postMessage({ type: 'ready', threshold: config.threshold, tag });
}

function normalise(vector) {
  let sum = 0;
  for (let i = 0; i < vector.length; i++) sum += vector[i] * vector[i];
  const length = Math.sqrt(sum) || 1;
  for (let i = 0; i < vector.length; i++) vector[i] /= length;
  return vector;
}

function embedding(tokens, size) {
  const count = tokens.length / size;
  const cls = normalise(Float32Array.from(tokens.subarray(0, size)));
  if (config.feature === 'cls') return cls;
  const patch = new Float32Array(size);
  for (let t = 1; t < count; t++) {
    for (let i = 0; i < size; i++) patch[i] += tokens[t * size + i];
  }
  for (let i = 0; i < size; i++) patch[i] /= count - 1;
  normalise(patch);
  const joined = new Float32Array(size * 2);
  joined.set(cls);
  joined.set(patch, size);
  return normalise(joined);
}

/* The catalogue's projection, as in the training scripts: subtract the mean, multiply by the matrix
   (one row per input number), then scale to length 1. */
function project(vector) {
  const { mean, matrix } = transform;
  const size = config.dimensions;
  const out = new Float32Array(size);
  for (let i = 0; i < vector.length; i++) {
    const centred = vector[i] - mean[i];
    const row = i * size;
    for (let d = 0; d < size; d++) out[d] += centred * matrix[row + d];
  }
  return normalise(out);
}

async function identify(pixels) {
  const side = config.inputSize;
  const input = new Float32Array(3 * side * side);
  for (let i = 0, n = side * side; i < n; i++) {
    for (let c = 0; c < 3; c++) {
      input[c * n + i] = (pixels[i * 4 + c] / 255 - config.mean[c]) / config.std[c];
    }
  }
  const started = performance.now();
  const output = await session.run({
    pixel_values: new ort.Tensor('float32', input, [1, 3, side, side]),
  });
  const tensor = output.last_hidden_state;
  // Saved photos keep this description, which does not change when the catalogue is rebuilt.
  const description = embedding(tensor.data, tensor.dims[2]);
  if (transform && description.length !== config.inputDimensions) throw new Error('Embedding size mismatch');
  const query = transform ? project(description) : description;
  if (query.length !== config.dimensions) throw new Error('Embedding size mismatch');

  const best = new Float32Array(classes).fill(-1);
  for (let p = 0; p < config.prototypes; p++) {
    let score = 0;
    const offset = p * config.dimensions;
    for (let i = 0; i < config.dimensions; i++) score += query[i] * gallery[offset + i];
    score /= 127;
    if (score > best[owners[p]]) best[owners[p]] = score;
  }
  const ranked = Array.from(best, (score, index) => ({ index, score }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  // The description goes back too, so the app can compare it with saved photos and save it.
  return { ranked, vector: description, ms: Math.round(performance.now() - started) };
}

self.onmessage = async ({ data }) => {
  try {
    if (data.type === 'init') await init();
    if (data.type === 'identify') {
      const result = await identify(data.pixels);
      self.postMessage({ type: 'result', ...result }, [result.vector.buffer]);
    }
  } catch (error) {
    self.postMessage({
      type: 'error',
      step: error.step || (data.type === 'init' ? 'engine' : 'photo'),
      message: String((error && error.message) || error),
    });
  }
};
