'use strict';

const STRINGS = {
  fr: {
    headline: 'Quelle est cette pomme ?',
    lead: 'Photographiez un fruit pour obtenir les variétés les plus proches. La photo reste sur votre téléphone.',
    take: 'Photographier une pomme',
    choose: 'Choisir une photo',
    tipsTitle: 'Pour une bonne photo',
    tip1: 'Une seule pomme, mûre, bien visible.',
    tip2: 'À la lumière du jour, sans flash ni ombre forte.',
    tip3: 'Essayez de profil, puis côté queue et côté œil.',
    frameTitle: 'Cadrez la pomme',
    frameLead: 'Déplacez et zoomez pour qu’elle remplisse le cercle.',
    zoom: 'Zoom',
    identify: 'Identifier',
    cancel: 'Annuler',
    again: 'Nouvelle photo',
    caution: 'Suggestion automatique à vérifier : comparez avec les photos de référence ou demandez à un pomologue. De nombreuses variétés normandes ne sont pas encore au catalogue.',
    credit: 'Données de référence :',
    creditBooklet: 'livret des conservatoires de Saint-Sauveur-le-Vicomte',
    loading: 'Préparation du modèle…',
    loadingPct: (p) => `Téléchargement du modèle : ${p} %`,
    ready: 'Prêt, fonctionne aussi hors connexion.',
    retrying: (n, max) => `Connexion interrompue. Nouvel essai (${n} sur ${max})…`,
    failed: 'Le modèle n’a pas pu démarrer. Rechargez la page.',
    downloadFailed: 'Le téléchargement du modèle a été interrompu. Vérifiez la connexion (le Wi-Fi est préférable), puis rechargez la page.',
    errorDetail: (message) => `Détail technique : ${message}`,
    badPhoto: 'Cette image n’a pas pu être ouverte.',
    identifyFailed: 'Cette photo n’a pas pu être analysée. Réessayez, ou prenez une autre photo.',
    working: 'Analyse…',
    sure: 'Variété probable',
    unsure: 'Suggestions à vérifier',
    unsureName: 'Variétés les plus proches',
    sureNote: 'C’est la référence la plus proche. Vérifiez-la avant de l’étiqueter.',
    unsureNote: 'Aucune n’est assez sûre pour nommer cette pomme. Enregistrez des photos de vos arbres connus : le téléphone apprendra à reconnaître vos variétés.',
    unsureNoteMine: 'Aucune n’est assez sûre pour nommer cette pomme. Comparez-les avec le fruit avant d’étiqueter l’arbre.',
    closest: 'Les plus proches au catalogue',
    use: 'Usage',
    origin: 'Origine',
    alias: 'Synonymes',
    mineTitle: 'Les plus proches parmi vos photos',
    photoCount: (n) => (n > 1 ? `${n} photos enregistrées` : '1 photo enregistrée'),
    saveTitle: 'Vous connaissez cette variété ?',
    saveLead: 'Enregistrez la photo sous son nom : le téléphone s’en servira pour reconnaître les prochaines.',
    saveName: 'Nom de la variété',
    save: 'Enregistrer',
    saved: (name) => `Photo enregistrée sous « ${name} ».`,
    undo: 'Annuler',
    saveFailed: 'La photo n’a pas pu être enregistrée sur ce téléphone.',
    libraryOpen: (n) => `Vos photos enregistrées (${n})`,
    libraryTitle: 'Vos photos enregistrées',
    libraryLead: 'Elles restent sur ce téléphone et servent à reconnaître vos variétés. Retirez toute photo enregistrée sous le mauvais nom.',
    libraryEmpty: 'Aucune photo enregistrée pour l’instant.',
    remove: 'Retirer',
    removeConfirm: (name) => `Retirer cette photo de « ${name} » ?`,
    back: 'Retour',
  },
  en: {
    headline: 'Which apple is this?',
    lead: 'Photograph a fruit to see the closest varieties. The photo stays on your phone.',
    take: 'Photograph an apple',
    choose: 'Choose a photo',
    tipsTitle: 'For a good photo',
    tip1: 'One ripe apple, clearly visible.',
    tip2: 'Daylight, with no flash or harsh shadow.',
    tip3: 'Try the side, then the stalk end and the eye end.',
    frameTitle: 'Frame the apple',
    frameLead: 'Drag and zoom so it fills the circle.',
    zoom: 'Zoom',
    identify: 'Identify',
    cancel: 'Cancel',
    again: 'New photo',
    caution: 'Automatic suggestion to verify: compare with the reference photos or ask a pomologist. Many Norman varieties are not in the catalogue yet.',
    credit: 'Reference data:',
    creditBooklet: 'Saint-Sauveur-le-Vicomte conservatory booklet',
    loading: 'Preparing the model…',
    loadingPct: (p) => `Downloading the model: ${p}%`,
    ready: 'Ready, also works offline.',
    retrying: (n, max) => `Connection interrupted. Trying again (${n} of ${max})…`,
    failed: 'The model could not start. Reload the page.',
    downloadFailed: 'The model download was interrupted. Check the connection (Wi-Fi is best), then reload the page.',
    errorDetail: (message) => `Technical detail: ${message}`,
    badPhoto: 'This image could not be opened.',
    identifyFailed: 'This photo could not be analysed. Try again, or take another photo.',
    working: 'Analysing…',
    sure: 'Likely variety',
    unsure: 'Suggestions to check',
    unsureName: 'Closest varieties',
    sureNote: 'This is the closest reference. Check it before labelling the tree.',
    unsureNote: 'None is reliable enough to name this apple. Save photos of trees you know: the phone will learn to recognise your varieties.',
    unsureNoteMine: 'None is reliable enough to name this apple. Compare them with the fruit before labelling the tree.',
    closest: 'Closest in the catalogue',
    use: 'Use',
    origin: 'Origin',
    alias: 'Synonyms',
    mineTitle: 'Closest among your photos',
    photoCount: (n) => (n > 1 ? `${n} saved photos` : '1 saved photo'),
    saveTitle: 'Do you know this variety?',
    saveLead: 'Save the photo under its name: the phone will use it to recognise the next ones.',
    saveName: 'Variety name',
    save: 'Save',
    saved: (name) => `Photo saved as “${name}”.`,
    undo: 'Undo',
    saveFailed: 'The photo could not be saved on this phone.',
    libraryOpen: (n) => `Your saved photos (${n})`,
    libraryTitle: 'Your saved photos',
    libraryLead: 'They stay on this phone and help recognise your varieties. Remove any photo saved under the wrong name.',
    libraryEmpty: 'No saved photos yet.',
    remove: 'Remove',
    removeConfirm: (name) => `Remove this photo of “${name}”?`,
    back: 'Back',
  },
};

const $ = (selector) => document.querySelector(selector);
const INPUT_SIZE = 224;
const MAX_PHOTO_SIDE = 1600;
const MAX_ATTEMPTS = 3;
const ERRORS = new Set(['failed', 'downloadFailed', 'badPhoto', 'identifyFailed']);

const state = {
  lang: readLanguage(),
  ready: false,
  busy: false,
  status: { key: 'loading', args: [] },
  model: { key: 'loading', args: [] }, // the latest model status, shown again on the start screen
  attempt: 0,
  threshold: 0,
  tag: null, // the model and settings behind each description, so old saved photos are never mixed in
  varieties: [],
  bitmap: null,
  zoom: 1,
  x: 0.5,
  y: 0.5,
  result: null,
  mine: [], // the visitor's own varieties closest to the current photo
  saved: null, // { id, name } once the current photo is saved, or { error }
  saving: false,
};

function readLanguage() {
  try {
    const saved = localStorage.getItem('lang');
    if (saved === 'fr' || saved === 'en') return saved;
  } catch (_) { /* storage may be unavailable */ }
  return (navigator.language || 'fr').toLowerCase().startsWith('en') ? 'en' : 'fr';
}

const t = (key) => STRINGS[state.lang][key];

function applyLanguage() {
  document.documentElement.lang = state.lang;
  document.querySelectorAll('[data-t]').forEach((node) => { node.textContent = t(node.dataset.t); });
  document.querySelectorAll('[data-tp]').forEach((node) => {
    node.placeholder = t(node.dataset.tp);
    node.setAttribute('aria-label', node.placeholder);
  });
  $('#lang').textContent = state.lang === 'fr' ? 'EN' : 'FR';
  renderStatus();
  updateLibraryButton();
  if (state.result) renderResult();
  if (!$('#screen-library').hidden) renderLibrary();
}

const errorText = (error) => String((error && error.message) || error || '');

/* A status is a message key, its values, and for errors the technical detail, which helps when someone reports a problem. */
function showStatus(status) {
  state.status = status;
  renderStatus();
}

const setStatus = (key, ...args) => showStatus({ key, args });
const setError = (key, detail) => showStatus({ key, args: [], detail });

function setModelStatus(key, ...args) {
  state.model = { key, args };
  showStatus(state.model);
}

function setModelError(key, detail) {
  state.model = { key, args: [], detail };
  showStatus(state.model);
}

const showModelStatus = () => showStatus(state.model);

function renderStatus() {
  const { key, args, detail } = state.status;
  const text = t(key);
  const node = $('#status');
  node.textContent = typeof text === 'function' ? text(...args) : text;
  node.classList.toggle('error', ERRORS.has(key));
  const extra = $('#status-detail');
  extra.hidden = !detail;
  extra.textContent = detail ? t('errorDetail')(detail) : '';
}

function show(name) {
  ['start', 'frame', 'result', 'library'].forEach((screen) => { $(`#screen-${screen}`).hidden = screen !== name; });
  window.scrollTo(0, 0);
}

/* Framing */

function sourceRect() {
  const { bitmap, zoom, x, y } = state;
  const side = Math.min(bitmap.width, bitmap.height) / zoom;
  const left = Math.max(0, Math.min(bitmap.width - side, x * bitmap.width - side / 2));
  const top = Math.max(0, Math.min(bitmap.height - side, y * bitmap.height - side / 2));
  state.x = (left + side / 2) / bitmap.width;
  state.y = (top + side / 2) / bitmap.height;
  return { left, top, side };
}

function drawCrop() {
  if (!state.bitmap) return;
  const canvas = $('#crop');
  const pixels = Math.round(canvas.clientWidth * Math.min(window.devicePixelRatio || 1, 2)) || 600;
  if (canvas.width !== pixels) { canvas.width = pixels; canvas.height = pixels; }
  const { left, top, side } = sourceRect();
  const context = canvas.getContext('2d');
  context.imageSmoothingQuality = 'high';
  context.drawImage(state.bitmap, left, top, side, side, 0, 0, pixels, pixels);
}

/* The photo, upright and at most MAX_PHOTO_SIDE pixels wide, on a canvas. As in the harvest app,
   which works on iPhones: Safari lacks some createImageBitmap options, so an image element is the
   fallback, and the photo is shrunk by drawing it rather than with resize options. Drawing straight
   into the small canvas also avoids a full-size one, which Safari refuses above about 16 megapixels. */
async function loadPhoto(file) {
  let source = null;
  let url = null;
  try {
    try {
      source = await createImageBitmap(file, { imageOrientation: 'from-image' });
    } catch (_) {
      url = URL.createObjectURL(file);
      source = new Image();
      source.src = url;
      await source.decode(); // drawn upright: images follow the photo's orientation by default
    }
    const width = source.naturalWidth || source.width;
    const height = source.naturalHeight || source.height;
    const scale = Math.min(1, MAX_PHOTO_SIDE / Math.max(width, height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(width * scale));
    canvas.height = Math.max(1, Math.round(height * scale));
    const context = canvas.getContext('2d');
    context.imageSmoothingQuality = 'high';
    context.drawImage(source, 0, 0, canvas.width, canvas.height);
    return canvas;
  } finally {
    if (source && source.close) source.close();
    if (url) URL.revokeObjectURL(url);
  }
}

async function openPhoto(file) {
  if (!file) return;
  try {
    const bitmap = await loadPhoto(file);
    Object.assign(state, { bitmap, zoom: 1, x: 0.5, y: 0.5, result: null });
    $('#zoom').value = 1;
    show('frame');
    drawCrop();
    showModelStatus();
  } catch (error) {
    show('start');
    setError('badPhoto', errorText(error));
  }
}

const pointers = new Map();
let pinchStart = null;

function pinchDistance() {
  const [a, b] = [...pointers.values()];
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function setZoom(value) {
  state.zoom = Math.max(1, Math.min(4, value));
  $('#zoom').value = state.zoom;
  drawCrop();
}

function bindFraming() {
  const stage = $('#stage');
  stage.addEventListener('pointerdown', (event) => {
    stage.setPointerCapture(event.pointerId);
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.size === 2) pinchStart = { distance: pinchDistance(), zoom: state.zoom };
  });
  stage.addEventListener('pointermove', (event) => {
    const previous = pointers.get(event.pointerId);
    if (!previous || !state.bitmap) return;
    const current = { x: event.clientX, y: event.clientY };
    pointers.set(event.pointerId, current);
    if (pointers.size === 2 && pinchStart) {
      setZoom(pinchStart.zoom * (pinchDistance() / pinchStart.distance));
    } else if (pointers.size === 1) {
      const side = Math.min(state.bitmap.width, state.bitmap.height) / state.zoom;
      const perPixel = side / stage.clientWidth;
      state.x -= ((current.x - previous.x) * perPixel) / state.bitmap.width;
      state.y -= ((current.y - previous.y) * perPixel) / state.bitmap.height;
      drawCrop();
    }
  });
  const release = (event) => {
    pointers.delete(event.pointerId);
    if (pointers.size < 2) pinchStart = null;
  };
  stage.addEventListener('pointerup', release);
  stage.addEventListener('pointercancel', release);
  $('#zoom').addEventListener('input', (event) => setZoom(Number(event.target.value)));
  window.addEventListener('resize', drawCrop);
}

/* Identification */

let worker = null;

function launch() {
  state.attempt += 1;
  worker = new Worker('worker.js');
  worker.onmessage = onWorkerMessage;
  // A worker that closes without a message usually ran out of memory.
  worker.onerror = (event) => {
    event.preventDefault();
    modelStopped('engine', event.message || 'the model closed');
  };
  worker.postMessage({ type: 'init' });
}

/* Runs now, or once the visitor is back on the page: phones pause hidden pages. */
function whenVisible(run) {
  if (document.visibilityState !== 'hidden') {
    run();
    return;
  }
  const back = () => {
    if (document.visibilityState === 'hidden') return;
    document.removeEventListener('visibilitychange', back);
    run();
  };
  document.addEventListener('visibilitychange', back);
}

function modelStopped(step, message) {
  console.error('Model stopped:', step, message);
  worker.terminate();
  worker = null;
  const wasBusy = state.busy;
  state.ready = false;
  state.busy = false;
  updateIdentifyButton();
  $('#meter').hidden = true;
  if (step === 'download' && state.attempt < MAX_ATTEMPTS) {
    // A cut connection is tried again by itself, a little later each time.
    setModelStatus('retrying', state.attempt + 1, MAX_ATTEMPTS);
    setTimeout(() => whenVisible(launch), state.attempt * 4000);
    return;
  }
  setModelError(step === 'download' ? 'downloadFailed' : 'failed', message);
  if (wasBusy) show('start');
}

function onWorkerMessage({ data }) {
  if (data.type === 'progress') {
    if (!data.total) {
      // Downloaded: the engine is being prepared.
      $('#meter').hidden = true;
      setModelStatus('loading');
      return;
    }
    const percent = Math.round((data.loaded / data.total) * 100);
    $('#meter').hidden = false;
    $('#meter-fill').style.width = `${percent}%`;
    setModelStatus('loadingPct', percent);
  } else if (data.type === 'ready') {
    state.ready = true;
    state.threshold = data.threshold;
    state.tag = data.tag;
    $('#meter').hidden = true;
    setModelStatus('ready');
    updateIdentifyButton();
  } else if (data.type === 'result') {
    state.busy = false;
    state.result = data;
    state.mine = Labelled.rank(data.vector, state.tag);
    state.saved = null;
    $('#save-name').value = '';
    updateIdentifyButton();
    renderResult();
    show('result');
  } else if (data.type === 'error' && data.step === 'photo') {
    state.busy = false;
    updateIdentifyButton();
    console.error(data.message);
    show('start');
    setError('identifyFailed', data.message);
  } else if (data.type === 'error') {
    modelStopped(data.step, data.message);
  }
}

function updateIdentifyButton() {
  const button = $('#identify');
  button.disabled = !state.ready || state.busy;
  button.textContent = state.busy ? t('working') : state.ready ? t('identify') : t('loading');
}

function identify() {
  if (!state.ready || state.busy || !state.bitmap) return;
  const canvas = document.createElement('canvas');
  canvas.width = INPUT_SIZE;
  canvas.height = INPUT_SIZE;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  context.imageSmoothingQuality = 'high';
  const { left, top, side } = sourceRect();
  context.drawImage(state.bitmap, left, top, side, side, 0, 0, INPUT_SIZE, INPUT_SIZE);
  $('#thumb').getContext('2d').drawImage(canvas, 0, 0);
  const { data } = context.getImageData(0, 0, INPUT_SIZE, INPUT_SIZE);
  state.busy = true;
  updateIdentifyButton();
  worker.postMessage({ type: 'identify', pixels: data }, [data.buffer]);
}

function metaLine(variety) {
  const colon = state.lang === 'fr' ? ' : ' : ': ';
  const parts = [];
  if (variety.use) parts.push(t('use') + colon + variety.use);
  if (variety.origin) parts.push(t('origin') + colon + variety.origin);
  if (variety.synonyms && variety.synonyms.length) {
    parts.push(t('alias') + colon + variety.synonyms.slice(0, 2).join(', '));
  }
  return parts.join(' · ');
}

function renderResult() {
  const { ranked } = state.result;
  const sure = ranked[0].score >= state.threshold;
  const top = state.varieties[ranked[0].index];
  const kicker = $('#kicker');
  kicker.textContent = sure ? t('sure') : t('unsure');
  kicker.className = `kicker ${sure ? 'sure' : 'unsure'}`;
  $('#verdict-name').textContent = sure ? top.name : t('unsureName');
  // Without saved photos, the note points to the feature that helps most.
  $('#verdict-note').textContent = sure ? t('sureNote') : t(Labelled.count ? 'unsureNoteMine' : 'unsureNote');
  $('#mine').hidden = !state.mine.length;
  $('#mine-matches').replaceChildren(...state.mine.map(({ name, count }) => matchItem(name, t('photoCount')(count))));
  $('#list-title').textContent = t('closest');
  $('#matches').replaceChildren(...ranked.map(({ index }) => {
    const variety = state.varieties[index];
    return matchItem(variety.name, metaLine(variety));
  }));
  renderSave();
}

function matchItem(name, meta) {
  const item = document.createElement('li');
  const title = document.createElement('span');
  title.className = 'match-name';
  title.textContent = name;
  item.append(title);
  if (meta) {
    const line = document.createElement('span');
    line.className = 'match-meta';
    line.textContent = meta;
    item.append(line);
  }
  return item;
}

/* Saving */

const element = (tag, props = {}) => Object.assign(document.createElement(tag), props);

function renderSave() {
  const { saved } = state;
  $('#save-form').hidden = !Labelled.available || Boolean(saved && !saved.error);
  $('#save-done').hidden = !saved;
  $('#save-done').classList.toggle('error', Boolean(saved && saved.error));
  if (saved) {
    $('#save-done-text').textContent = saved.error ? t('saveFailed') : t('saved')(saved.name);
    $('#save-undo').hidden = Boolean(saved.error);
    $('#save-detail').hidden = !saved.error;
    $('#save-detail').textContent = saved.error ? t('errorDetail')(saved.error) : '';
  }
  // The closest names, one tap to fill in.
  const closest = [
    ...state.mine.map(({ name }) => name),
    ...state.result.ranked.map(({ index }) => state.varieties[index].name),
  ];
  $('#save-chips').replaceChildren(...[...new Set(closest)].slice(0, 4).map((name) => {
    const chip = element('button', { type: 'button', className: 'chip', textContent: name });
    chip.addEventListener('click', () => { $('#save-name').value = name; });
    return chip;
  }));
  const names = [...new Set([...Labelled.names(), ...state.varieties.map((variety) => variety.name)])];
  $('#variety-names').replaceChildren(...names.sort((a, b) => a.localeCompare(b, 'fr')).map((value) => element('option', { value })));
}

async function saveResult(event) {
  event.preventDefault();
  const input = $('#save-name');
  const typed = input.value.trim().replace(/\s+/g, ' ').slice(0, 80);
  if (!typed) {
    input.focus();
    return;
  }
  if (!state.result || state.saving) return;
  state.saving = true;
  $('#save-button').disabled = true;
  try {
    // A catalogue name, however it is typed, is saved with the catalogue's spelling.
    const known = state.varieties.find((variety) => Labelled.nameKey(variety.name) === Labelled.nameKey(typed));
    const thumb = await new Promise((resolve, reject) => {
      $('#thumb').toBlob((blob) => (blob ? resolve(blob) : reject(new Error('the picture could not be made'))), 'image/jpeg', 0.85);
    });
    const record = await Labelled.add({
      name: known ? known.name : typed,
      varietyId: known ? known.id : null,
      tag: state.tag,
      vector: state.result.vector,
      thumb,
    });
    state.saved = { id: record.id, name: record.name };
    input.blur();
  } catch (error) {
    console.error('Photo not saved:', error);
    state.saved = { error: errorText(error) };
  } finally {
    state.saving = false;
    $('#save-button').disabled = false;
  }
  renderSave();
  updateLibraryButton();
}

async function undoSave() {
  const { saved } = state;
  if (!saved || !saved.id) return;
  try {
    await Labelled.remove(saved.id);
  } catch (error) {
    console.error('Photo not removed:', error);
    return;
  }
  state.saved = null;
  $('#save-name').value = saved.name;
  renderSave();
  updateLibraryButton();
}

/* Saved photos */

let thumbUrls = [];

function updateLibraryButton() {
  const button = $('#open-library');
  button.hidden = !Labelled.available || !Labelled.count;
  button.textContent = t('libraryOpen')(Labelled.count);
}

function renderLibrary() {
  thumbUrls.forEach((url) => URL.revokeObjectURL(url));
  thumbUrls = [];
  const groups = Labelled.groups();
  if (!groups.length) {
    $('#library').replaceChildren(element('p', { className: 'note', textContent: t('libraryEmpty') }));
    return;
  }
  $('#library').replaceChildren(...groups.flatMap((group) => {
    const grid = element('ul', { className: 'thumbs' });
    for (const photo of group.photos) {
      const item = element('li');
      if (photo.thumb instanceof Blob) {
        const url = URL.createObjectURL(photo.thumb);
        thumbUrls.push(url);
        item.append(element('img', { src: url, alt: group.name, width: 224, height: 224 }));
      }
      const remove = element('button', { type: 'button', className: 'remove', textContent: '×' });
      remove.setAttribute('aria-label', t('remove'));
      remove.addEventListener('click', () => removePhoto(photo.id, group.name));
      item.append(remove);
      grid.append(item);
    }
    return [
      element('h2', { textContent: group.name }),
      element('p', { className: 'match-meta', textContent: t('photoCount')(group.photos.length) }),
      grid,
    ];
  }));
}

async function removePhoto(id, name) {
  if (!window.confirm(t('removeConfirm')(name))) return;
  try {
    await Labelled.remove(id);
  } catch (error) {
    console.error('Photo not removed:', error);
    return;
  }
  if (state.saved && state.saved.id === id) state.saved = null;
  renderLibrary();
  updateLibraryButton();
}

function openLibrary() {
  renderLibrary();
  show('library');
}

function reset() {
  $('#take').value = '';
  $('#choose').value = '';
  state.result = null;
  state.saved = null;
  show('start');
  showModelStatus();
}

async function start() {
  applyLanguage();
  bindFraming();
  updateIdentifyButton();
  $('#take').addEventListener('change', (event) => openPhoto(event.target.files[0]));
  $('#choose').addEventListener('change', (event) => openPhoto(event.target.files[0]));
  $('#identify').addEventListener('click', identify);
  $('#cancel').addEventListener('click', reset);
  $('#again').addEventListener('click', reset);
  $('#home').addEventListener('click', reset);
  $('#save-form').addEventListener('submit', saveResult);
  $('#save-undo').addEventListener('click', undoSave);
  $('#open-library').addEventListener('click', openLibrary);
  $('#library-back').addEventListener('click', () => show('start'));
  Labelled.load().then(updateLibraryButton);
  $('#lang').addEventListener('click', () => {
    state.lang = state.lang === 'fr' ? 'en' : 'fr';
    try { localStorage.setItem('lang', state.lang); } catch (_) { /* optional */ }
    applyLanguage();
    updateIdentifyButton();
  });

  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('sw.js');
      await navigator.serviceWorker.ready;
      if (!navigator.serviceWorker.controller) {
        await new Promise((resolve) => {
          navigator.serviceWorker.addEventListener('controllerchange', resolve, { once: true });
          setTimeout(resolve, 2000);
        });
      }
    } catch (_) { /* the app still works online without offline support */ }
  }

  try {
    state.varieties = await (await fetch('model/varieties.json')).json();
    launch();
  } catch (error) {
    setModelError('failed', errorText(error));
  }
}

start();
