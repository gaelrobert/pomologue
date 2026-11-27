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
    unsureNote: 'Aucune n’est assez sûre pour nommer cette pomme. Importez les photos du Carnet de récolte, ou enregistrez des photos de vos arbres connus : le téléphone apprendra à reconnaître vos variétés.',
    unsureNoteMine: 'Aucune n’est assez sûre pour nommer cette pomme. Comparez-les avec le fruit avant d’étiqueter l’arbre.',
    closest: 'Les plus proches au catalogue',
    use: 'Usage',
    origin: 'Origine',
    alias: 'Synonymes',
    mineTitle: 'Les plus proches parmi vos photos',
    photoCount: (n) => (n > 1 ? `${n} photos enregistrées` : '1 photo enregistrée'),
    harvestCount: (n) => (n > 1 ? `${n} photos du carnet` : '1 photo du carnet'),
    saveTitle: 'Vous connaissez cette variété ?',
    saveLead: 'Enregistrez la photo sous son nom : le téléphone s’en servira pour reconnaître les prochaines.',
    saveName: 'Nom de la variété',
    save: 'Enregistrer',
    saved: (name) => `Photo enregistrée sous « ${name} ».`,
    undo: 'Annuler',
    saveFailed: 'La photo n’a pas pu être enregistrée sur ce téléphone.',
    libraryOpen: (n) => (n ? `Vos photos (${n})` : 'Vos photos'),
    libraryTitle: 'Vos photos',
    libraryLead: 'Elles restent sur ce téléphone et servent à reconnaître vos variétés.',
    harvestTitle: 'Photos du Carnet de récolte',
    harvestLead: 'Dans le Carnet de récolte, ouvrez Sauvegarde, cochez « Inclure les photos déjà sauvegardées » et enregistrez le ou les fichiers. Importez-les ici : Pomologue garde une petite image et la description de chaque photo.',
    harvestImport: 'Importer une sauvegarde du carnet',
    harvestReading: 'Lecture de la sauvegarde…',
    harvestWaiting: 'Les photos seront décrites dès que le modèle sera prêt.',
    harvestProgress: (done, total) => `Description des photos du carnet : ${done} sur ${total}…`,
    harvestDone: (added, known) => {
      const first = added > 1 ? `${added} photos ajoutées` : added === 1 ? '1 photo ajoutée' : 'Aucune nouvelle photo';
      const second = known > 1 ? `, ${known} déjà présentes` : known === 1 ? ', 1 déjà présente' : '';
      return `${first}${second}.`;
    },
    harvestFailed: (n) => (n > 1 ? `${n} photos n’ont pas pu être lues.` : '1 photo n’a pas pu être lue.'),
    harvestFull: 'Le téléphone n’a plus assez de place pour garder ces photos.',
    notBackup: 'Ce fichier n’est pas une sauvegarde du Carnet de récolte.',
    unreadable: 'Cette sauvegarde n’a pas pu être lue.',
    harvestDirect: 'Les photos du Carnet de récolte de ce téléphone sont lues directement : les nouvelles arrivent toutes seules.',
    harvestEmpty: 'Aucune photo du carnet pour l’instant.',
    harvestForget: 'Oublier les photos importées',
    harvestForgetConfirm: (n) => `Oublier les ${n} photos importées ? Elles restent dans le Carnet de récolte.`,
    checkOpen: 'Bilan de reconnaissance',
    checkTitle: 'Bilan de reconnaissance',
    checkLead: 'Pomologue apprend chaque variété avec ses photos du carnet des deux premiers jours de cueillette, puis se teste sur les photos des jours suivants, qu’il n’a pas apprises. C’est la même comparaison que pour une pomme à identifier.',
    checkBusy: 'Des photos du carnet sont en cours d’ajout : le bilan sera mis à jour.',
    checkNeeds: 'Pas encore de bilan. Il faut au moins deux variétés photographiées deux jours dans le Carnet de récolte, puis des photos d’un troisième jour, importées ici.',
    statTop1: 'Bonne variété en premier',
    statTop3: 'Parmi les 3 premières',
    statChance: 'Au hasard',
    checkBasis: (photos, varieties) => `Sur ${photos > 1 ? `${photos} photos` : '1 photo'} de test, avec ${varieties} variétés au choix.`,
    perVariety: 'Par variété',
    varietyScore: (right, n) => `Reconnue ${right} fois sur ${n}`,
    confusedWith: (name, n) => `confondue avec ${name} (${n} fois)`,
    noTestYet: 'Pas encore de photos d’un troisième jour',
    checkCaution: 'Avec peu de photos, ces chiffres varient beaucoup. Ils valent pour votre verger et vos conditions de prise de vue. Si une variété est toujours photographiée sur le même fond, le téléphone peut reconnaître le fond plutôt que la pomme. Les photos enregistrées dans Pomologue ne comptent pas ici.',
    savedTitle: 'Enregistrées dans Pomologue',
    libraryEmpty: 'Aucune photo enregistrée ici pour l’instant.',
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
    unsureNote: 'None is reliable enough to name this apple. Import your photos from Carnet de récolte, or save photos of trees you know: the phone will learn to recognise your varieties.',
    unsureNoteMine: 'None is reliable enough to name this apple. Compare them with the fruit before labelling the tree.',
    closest: 'Closest in the catalogue',
    use: 'Use',
    origin: 'Origin',
    alias: 'Synonyms',
    mineTitle: 'Closest among your photos',
    photoCount: (n) => (n > 1 ? `${n} saved photos` : '1 saved photo'),
    harvestCount: (n) => (n > 1 ? `${n} harvest photos` : '1 harvest photo'),
    saveTitle: 'Do you know this variety?',
    saveLead: 'Save the photo under its name: the phone will use it to recognise the next ones.',
    saveName: 'Variety name',
    save: 'Save',
    saved: (name) => `Photo saved as “${name}”.`,
    undo: 'Undo',
    saveFailed: 'The photo could not be saved on this phone.',
    libraryOpen: (n) => (n ? `Your photos (${n})` : 'Your photos'),
    libraryTitle: 'Your photos',
    libraryLead: 'They stay on this phone and help recognise your varieties.',
    harvestTitle: 'Photos from Carnet de récolte',
    harvestLead: 'In Carnet de récolte, open Backup, tick “Include photos already backed up” and save the file or files. Import them here: Pomologue keeps a small picture and the description of each photo.',
    harvestImport: 'Import a harvest backup',
    harvestReading: 'Reading the backup…',
    harvestWaiting: 'The photos will be described once the model is ready.',
    harvestProgress: (done, total) => `Describing harvest photos: ${done} of ${total}…`,
    harvestDone: (added, known) => {
      const first = added > 1 ? `${added} photos added` : added === 1 ? '1 photo added' : 'No new photos';
      const second = known ? `, ${known} already here` : '';
      return `${first}${second}.`;
    },
    harvestFailed: (n) => (n > 1 ? `${n} photos could not be read.` : '1 photo could not be read.'),
    harvestFull: 'The phone has no room left to keep these photos.',
    notBackup: 'This file is not a Carnet de récolte backup.',
    unreadable: 'This backup could not be read.',
    harvestDirect: 'Photos from Carnet de récolte on this phone are read directly: new ones arrive by themselves.',
    harvestEmpty: 'No harvest photos yet.',
    harvestForget: 'Forget the imported photos',
    harvestForgetConfirm: (n) => `Forget the ${n} imported photos? They stay in Carnet de récolte.`,
    checkOpen: 'Recognition check',
    checkTitle: 'Recognition check',
    checkLead: 'Pomologue learns each variety from its harvest photos of the first two picking days, then tests itself on photos from later days, which it has not learnt. It is the same comparison as for an apple you identify.',
    checkBusy: 'Harvest photos are being added: the check will be updated.',
    checkNeeds: 'No check yet. It needs at least two varieties photographed on two days in Carnet de récolte, then photos from a third day, imported here.',
    statTop1: 'Right variety first',
    statTop3: 'In the top 3',
    statChance: 'By chance',
    checkBasis: (photos, varieties) => `From ${photos > 1 ? `${photos} test photos` : '1 test photo'}, choosing among ${varieties} varieties.`,
    perVariety: 'By variety',
    varietyScore: (right, n) => `Recognised: ${right} of ${n}`,
    confusedWith: (name, n) => `mistaken for ${name} (${n}×)`,
    noTestYet: 'No photos from a third day yet',
    checkCaution: 'With few photos, these figures vary a lot. They hold for your orchard and the way you take photos. If a variety is always photographed on the same background, the phone may recognise the background rather than the apple. Photos saved in Pomologue are not counted here.',
    savedTitle: 'Saved in Pomologue',
    libraryEmpty: 'No photos saved here yet.',
    remove: 'Remove',
    removeConfirm: (name) => `Remove this photo of “${name}”?`,
    back: 'Back',
  },
};

const $ = (selector) => document.querySelector(selector);
const element = (tag, props = {}) => Object.assign(document.createElement(tag), props);
const INPUT_SIZE = 224;
const MAX_PHOTO_SIDE = 1600;
const MAX_ATTEMPTS = 3;
const ERRORS = new Set(['failed', 'downloadFailed', 'badPhoto', 'identifyFailed', 'notBackup', 'unreadable', 'harvestFull']);
let resultUrls = []; // pictures shown with the current result

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
  renderHarvestStatus();
  updateLibraryButton();
  if (state.result) renderResult();
  if (!$('#screen-library').hidden) renderLibrary();
  if (!$('#screen-check').hidden) renderCheck();
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
  ['start', 'frame', 'result', 'library', 'check'].forEach((screen) => { $(`#screen-${screen}`).hidden = screen !== name; });
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
  // Harvest photos being described are tried again once the model is back.
  for (const waiting of describing.values()) waiting.reject(Object.assign(new Error(message), { stopped: true }));
  describing.clear();
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
    updateLibraryButton();
    processHarvest();
    syncCarnet();
  } else if (data.type === 'result') {
    state.busy = false;
    state.result = data;
    state.mine = Labelled.rank(data.vector, state.tag);
    state.saved = null;
    $('#save-name').value = '';
    updateIdentifyButton();
    renderResult();
    show('result');
  } else if (data.type === 'described' || (data.type === 'error' && data.id)) {
    const waiting = describing.get(data.id);
    if (!waiting) return;
    describing.delete(data.id);
    if (data.type === 'described') waiting.resolve(data.vector);
    else waiting.reject(new Error(data.message));
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
  // Without photos of their own, the note points to the features that help most.
  $('#verdict-note').textContent = sure ? t('sureNote') : t(state.mine.length ? 'unsureNoteMine' : 'unsureNote');
  $('#mine').hidden = !state.mine.length;
  resultUrls.forEach((url) => URL.revokeObjectURL(url));
  resultUrls = [];
  $('#mine-matches').replaceChildren(...state.mine.map(({ name, saved, harvest: fromHarvest, thumb }) => {
    const counts = [fromHarvest && t('harvestCount')(fromHarvest), saved && t('photoCount')(saved)].filter(Boolean);
    let url = null;
    if (thumb instanceof Blob) {
      url = URL.createObjectURL(thumb);
      resultUrls.push(url);
    }
    return matchItem(name, counts.join(' · '), url);
  }));
  $('#list-title').textContent = t('closest');
  $('#matches').replaceChildren(...ranked.map(({ index }) => {
    const variety = state.varieties[index];
    return matchItem(variety.name, metaLine(variety));
  }));
  renderSave();
}

/* `picture`, when given, is the visitor's own closest photo of that variety, to compare with the fruit. */
function matchItem(name, meta, picture = null) {
  const item = document.createElement('li');
  const text = document.createElement('div');
  const title = document.createElement('span');
  title.className = 'match-name';
  title.textContent = name;
  text.append(title);
  if (meta) {
    const line = document.createElement('span');
    line.className = 'match-meta';
    line.textContent = meta;
    text.append(line);
  }
  if (picture) {
    item.className = 'with-picture';
    item.append(element('img', { src: picture, alt: '', width: 224, height: 224 }));
  }
  item.append(text);
  return item;
}

/* Saving */

const toJpeg = (canvas, quality) => new Promise((resolve, reject) => {
  canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('the picture could not be made'))), 'image/jpeg', quality);
});

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
    const thumb = await toJpeg($('#thumb'), 0.85);
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

const HARVEST_THUMBS = 6; // per variety: the harvest app holds the full set

function updateLibraryButton() {
  const button = $('#open-library');
  // Always there once storage works, since it also leads to the harvest import.
  button.hidden = !Labelled.available;
  button.textContent = t('libraryOpen')(Labelled.count + Labelled.harvestCount(state.tag));
}

function thumbItem(photo, name) {
  const item = element('li');
  if (photo.thumb instanceof Blob) {
    const url = URL.createObjectURL(photo.thumb);
    thumbUrls.push(url);
    item.append(element('img', { src: url, alt: name, width: 224, height: 224 }));
  }
  return item;
}

function renderLibrary() {
  thumbUrls.forEach((url) => URL.revokeObjectURL(url));
  thumbUrls = [];

  const harvestGroups = state.tag ? Labelled.harvestGroups(state.tag) : [];
  $('#harvest-direct').hidden = !Labelled.harvestIds('carnet').length;
  $('#harvest-forget').hidden = !Labelled.harvestIds('backup').length || harvest.running;
  $('#open-check').hidden = !harvestGroups.length;
  $('#harvest-list').replaceChildren(...(harvestGroups.length
    ? harvestGroups.flatMap((group) => {
      const grid = element('ul', { className: 'thumbs' });
      group.photos.slice(0, HARVEST_THUMBS).forEach((photo) => grid.append(thumbItem(photo, group.name)));
      return [
        element('h3', { textContent: group.name }),
        element('p', { className: 'match-meta', textContent: t('harvestCount')(group.photos.length) }),
        grid,
      ];
    })
    : [element('p', { className: 'note', textContent: t('harvestEmpty') })]));

  const groups = Labelled.groups();
  if (!groups.length) {
    $('#library').replaceChildren(element('p', { className: 'note', textContent: t('libraryEmpty') }));
    return;
  }
  $('#library').replaceChildren(...groups.flatMap((group) => {
    const grid = element('ul', { className: 'thumbs' });
    for (const photo of group.photos) {
      const item = thumbItem(photo, group.name);
      const remove = element('button', { type: 'button', className: 'remove', textContent: '×' });
      remove.setAttribute('aria-label', t('remove'));
      remove.addEventListener('click', () => removePhoto(photo.id, group.name));
      item.append(remove);
      grid.append(item);
    }
    return [
      element('h3', { textContent: group.name }),
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
  renderHarvestStatus();
  show('library');
}

/* Recognition check */

const percent = (value) => new Intl.NumberFormat(state.lang === 'fr' ? 'fr-FR' : 'en-GB', { style: 'percent', maximumFractionDigits: 0 }).format(value);

function renderCheck() {
  const result = state.tag ? Labelled.selfTest(state.tag) : null;
  if (!result || result.varieties < 2 || !result.photos) {
    $('#check-body').replaceChildren(element('p', { className: 'note', textContent: t('checkNeeds') }));
    return;
  }
  const stats = element('dl', { className: 'stats' });
  [
    [t('statTop1'), result.top1 / result.photos],
    result.varieties >= 4 && [t('statTop3'), result.top3 / result.photos],
    [t('statChance'), 1 / result.varieties],
  ].filter(Boolean).forEach(([label, value]) => {
    const tile = element('div');
    tile.append(element('dt', { textContent: label }), element('dd', { textContent: percent(value) }));
    stats.append(tile);
  });
  const rows = element('ul', { className: 'matches' });
  for (const entry of result.perVariety) {
    const meta = entry.test
      ? [t('varietyScore')(entry.correct, entry.test), entry.confusedWith && t('confusedWith')(entry.confusedWith, entry.confusedCount)]
      : [t('noTestYet')];
    rows.append(matchItem(entry.name, meta.filter(Boolean).join(' · ')));
  }
  $('#check-body').replaceChildren(
    stats,
    element('p', { className: 'match-meta', textContent: t('checkBasis')(result.photos, result.varieties) }),
    element('h2', { textContent: t('perVariety') }),
    rows,
  );
}

function openCheck() {
  renderCheck();
  renderHarvestStatus();
  show('check');
}

/* Harvest photos, from Carnet de récolte */

const harvest = {
  queue: [], // photos waiting to be described, each with an image() that reads it when needed
  running: false,
  reading: false,
  syncing: false,
  batch: null, // counts for the photos queued since the queue was last empty
  notice: null, // { key, detail } when a chosen file could not be read
  closeDirect: null, // closes the harvest app's storage once its photos are described
};
const describing = new Map();
let nextRequest = 1;

function newBatch() {
  harvest.batch = { total: 0, done: 0, added: 0, known: 0, failed: 0, error: null, detail: null };
  harvest.notice = null;
}
newBatch();

function describePixels(pixels) {
  return new Promise((resolve, reject) => {
    if (!worker || !state.ready) {
      reject(Object.assign(new Error('the model is not ready'), { stopped: true }));
      return;
    }
    const id = nextRequest;
    nextRequest += 1;
    describing.set(id, { resolve, reject });
    worker.postMessage({ type: 'describe', id, pixels }, [pixels.buffer]);
  });
}

/* The centre square, as a photo to identify is framed before it is moved or zoomed. */
async function harvestPixels(blob) {
  const photo = await loadPhoto(blob);
  const side = Math.min(photo.width, photo.height);
  const canvas = element('canvas', { width: INPUT_SIZE, height: INPUT_SIZE });
  const context = canvas.getContext('2d', { willReadFrequently: true });
  context.imageSmoothingQuality = 'high';
  context.drawImage(photo, (photo.width - side) / 2, (photo.height - side) / 2, side, side, 0, 0, INPUT_SIZE, INPUT_SIZE);
  const thumb = await toJpeg(canvas, 0.8);
  return { pixels: context.getImageData(0, 0, INPUT_SIZE, INPUT_SIZE).data, thumb };
}

function enqueueHarvest(photos, source) {
  if (!harvest.queue.length && !harvest.running) newBatch();
  const queued = new Set(harvest.queue.map((item) => item.id));
  for (const photo of photos) {
    if (queued.has(photo.id)) continue;
    queued.add(photo.id);
    harvest.queue.push({ ...photo, source });
    harvest.batch.total += 1;
  }
  processHarvest();
}

/* One photo at a time, so a photo to identify never waits long behind them. */
async function processHarvest() {
  if (harvest.running) return;
  if (!state.ready || !harvest.queue.length) {
    renderHarvestStatus();
    return;
  }
  harvest.running = true;
  const { batch } = harvest;
  renderHarvestStatus();
  try {
    while (harvest.queue.length && state.ready) {
      const item = harvest.queue[0];
      try {
        if (Labelled.harvestPhoto(item.id, state.tag)) {
          await Labelled.refreshHarvest([item]); // already here: only its name or details may have changed
          batch.known += 1;
        } else {
          const { pixels, thumb } = await harvestPixels(await item.image());
          const vector = await describePixels(pixels);
          await Labelled.putHarvest({ ...item, tag: state.tag, vector, thumb });
          batch.added += 1;
        }
      } catch (error) {
        if (error && error.stopped) break; // the model stopped: tried again once it is back
        console.error('Harvest photo not added:', item.id, error);
        if (error && error.name === 'QuotaExceededError') {
          batch.error = 'harvestFull';
          batch.failed += harvest.queue.length;
          batch.done = batch.total;
          harvest.queue = [];
          break;
        }
        batch.failed += 1;
        batch.detail = errorText(error);
      }
      harvest.queue.shift();
      batch.done += 1;
      renderHarvestStatus();
    }
  } finally {
    harvest.running = false;
    if (!harvest.queue.length && harvest.closeDirect) {
      harvest.closeDirect();
      harvest.closeDirect = null;
    }
    renderHarvestStatus();
    updateLibraryButton();
    if (!$('#screen-library').hidden) renderLibrary();
    if (!$('#screen-check').hidden) renderCheck();
  }
}

function renderHarvestStatus() {
  const { batch, notice } = harvest;
  const parts = [];
  let detail = null;
  if (harvest.reading) parts.push(t('harvestReading'));
  else if (harvest.queue.length && !state.ready) parts.push(t('harvestWaiting'));
  else if (harvest.queue.length || harvest.running) parts.push(t('harvestProgress')(batch.done, batch.total));
  else if (batch.error) {
    parts.push(t(batch.error));
    detail = batch.detail;
  } else if (batch.total) {
    parts.push(t('harvestDone')(batch.added, batch.known));
    if (batch.failed) {
      parts.push(t('harvestFailed')(batch.failed));
      detail = batch.detail;
    }
  }
  if (notice && !harvest.reading) {
    parts.push(t(notice.key));
    detail = notice.detail;
  }
  const node = $('#harvest-status');
  node.textContent = parts.join(' ');
  node.classList.toggle('error', Boolean(batch.error || (notice && !harvest.reading)));
  const extra = $('#harvest-detail');
  extra.hidden = !detail;
  extra.textContent = detail ? t('errorDetail')(detail) : '';
  $('#check-busy').hidden = !harvest.queue.length && !harvest.running;
}

async function importBackups(input) {
  const files = [...input.files];
  input.value = '';
  if (!files.length || harvest.reading) return;
  harvest.reading = true;
  if (!harvest.queue.length && !harvest.running) newBatch(); // the message then covers this import only
  harvest.notice = null;
  renderHarvestStatus();
  const photos = [];
  let problem = null;
  for (const file of files) {
    try {
      photos.push(...(await Carnet.readBackup(file)).photos);
    } catch (error) {
      console.error('Backup not read:', file.name, error);
      problem = {
        key: error instanceof Carnet.BackupError ? error.key : 'unreadable',
        detail: `${file.name}: ${errorText(error)}`,
      };
    }
  }
  harvest.reading = false;
  if (!photos.length && !problem) problem = { key: 'notBackup', detail: 'no photos' };
  if (photos.length) enqueueHarvest(photos, 'backup');
  harvest.notice = problem; // after queueing, which starts a new message
  renderHarvestStatus();
}

async function forgetHarvest() {
  const ids = Labelled.harvestIds('backup');
  if (!ids.length || harvest.running || !window.confirm(t('harvestForgetConfirm')(ids.length))) return;
  try {
    await Labelled.removeHarvest(ids);
  } catch (error) {
    console.error('Harvest photos not removed:', error);
    return;
  }
  newBatch();
  harvest.notice = null;
  renderHarvestStatus();
  renderLibrary();
  updateLibraryButton();
}

/* Where this browser shares storage with the harvest app, its photos are read directly, and photos
   deleted there are dropped here too. Its storage is only read, never changed. */
async function syncCarnet() {
  if (!state.ready || !Labelled.available || harvest.syncing || harvest.running || harvest.queue.length) return;
  harvest.syncing = true;
  try {
    const found = await Carnet.readDirect();
    if (!found) return;
    const present = new Set(found.photos.map((photo) => photo.id));
    await Labelled.removeHarvest(Labelled.harvestIds('carnet').filter((id) => !present.has(id)));
    const photos = found.photos.map((photo) => ({ ...photo, source: 'carnet' }));
    await Labelled.refreshHarvest(photos);
    const fresh = photos.filter((photo) => !Labelled.harvestPhoto(photo.id, state.tag));
    if (fresh.length && !harvest.running && !harvest.queue.length) {
      harvest.closeDirect = found.close;
      enqueueHarvest(fresh, 'carnet');
    } else {
      found.close();
    }
    updateLibraryButton();
    if (!$('#screen-library').hidden) renderLibrary();
    if (!$('#screen-check').hidden) renderCheck();
  } catch (error) {
    console.error('Carnet de récolte not read:', error);
  } finally {
    harvest.syncing = false;
  }
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
  $('#harvest-file').addEventListener('change', (event) => importBackups(event.target));
  $('#harvest-forget').addEventListener('click', forgetHarvest);
  $('#open-check').addEventListener('click', openCheck);
  $('#check-back').addEventListener('click', openLibrary);
  // Back from the harvest app, perhaps with new photos.
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') syncCarnet();
  });
  Labelled.load().then(() => {
    updateLibraryButton();
    syncCarnet();
  });
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
