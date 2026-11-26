/* Offline support. Large fixed files are cache-first; everything else prefers
   the network briefly so a retrained catalogue reaches phones automatically. */
// Other apps on the same website (such as Carnet de récolte) share this storage, so only
// caches with this prefix are ever removed.
const PREFIX = 'pomologue-';
const CACHE = `${PREFIX}v3`;
const SHELL = [
  './',
  'index.html',
  'app.css',
  'app.js',
  'labelled.js',
  'worker.js',
  'manifest.webmanifest',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'vendor/ort.wasm.min.js',
  'vendor/ort-wasm-simd-threaded.mjs',
  'model/config.json',
  'model/varieties.json',
  'model/gallery.bin',
  'model/transform.bin',
];
const IMMUTABLE = /\/(vendor\/|model\/dinov2-small\/)/;
// Exact sizes of the two large files, so a download cut short is never kept. Update them if either changes.
const SIZES = {
  'ort-wasm-simd-threaded.wasm': 11210254,
  'model_quantized.onnx': 24427763,
};

const fileName = (url) => new URL(url).pathname.split('/').pop();

self.addEventListener('install', (event) => {
  // 'reload' skips the browser's own copies, so an update never mixes old and new files.
  const fresh = SHELL.map((url) => new Request(url, { cache: 'reload' }));
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(fresh)).then(() => self.skipWaiting()));
});

/* Removes a saved model or engine that is not complete, so it is downloaded again. */
async function dropIncomplete() {
  const cache = await caches.open(CACHE);
  for (const request of await cache.keys()) {
    const expected = SIZES[fileName(request.url)];
    if (!expected) continue;
    const response = await cache.match(request);
    const size = response ? (await response.arrayBuffer()).byteLength : -1;
    if (size !== expected) await cache.delete(request);
  }
}

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys
        .filter((key) => key.startsWith(PREFIX) && key !== CACHE)
        .map((key) => caches.delete(key))))
      .then(dropIncomplete)
      .catch((error) => console.error('Cache check failed:', error))
      .then(() => self.clients.claim()),
  );
});

async function cacheFirst(request) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(request);
  if (hit) return hit;
  const response = await fetch(request);
  if (response.ok) await cache.put(request, response.clone());
  return response;
}

async function keepIfComplete(request, response) {
  const body = await response.arrayBuffer();
  if (body.byteLength !== SIZES[fileName(request.url)]) return;
  const cache = await caches.open(CACHE);
  await cache.put(request, new Response(body, {
    headers: { 'content-type': response.headers.get('content-type') || 'application/octet-stream' },
  }));
}

/* The large files reach the app as they arrive and are kept once complete. `kept` ends the service worker's wait. */
async function respondLarge(request, kept) {
  try {
    const hit = await (await caches.open(CACHE)).match(request);
    if (hit) {
      kept();
      return hit;
    }
    const response = await fetch(request);
    kept(response.ok ? keepIfComplete(request, response.clone()).catch(() => {}) : undefined);
    return response;
  } catch (error) {
    kept();
    throw error;
  }
}

async function networkFirst(request) {
  const cache = await caches.open(CACHE);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 3000);
  try {
    const response = await fetch(request, { signal: controller.signal });
    if (response.ok) await cache.put(request, response.clone());
    return response;
  } catch (error) {
    const hit = await cache.match(request, { ignoreSearch: true });
    if (hit) return hit;
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (SIZES[fileName(url.href)]) {
    // waitUntil is called now, while the event is live: Safari refuses it later.
    let kept;
    event.waitUntil(new Promise((resolve) => { kept = resolve; }));
    event.respondWith(respondLarge(event.request, kept));
    return;
  }
  event.respondWith(IMMUTABLE.test(url.pathname) ? cacheFirst(event.request) : networkFirst(event.request));
});
