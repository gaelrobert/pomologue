'use strict';

/* The visitor's own photos, kept on this phone in IndexedDB as a small picture and the model's
   description of it. Two kinds:
   - photos saved here under a variety name;
   - photos from the Carnet de récolte app, from its backups or read from it directly.
   Each new photo is compared with the average description of each variety, view by view, as in
   the harvest app's recognition check. Nothing is sent anywhere. */
const Labelled = (() => {
  const DB_NAME = 'pomologue';
  const SAVED = 'labelled';
  const HARVEST = 'harvest';
  let database = null;
  let photos = [];
  let harvest = [];
  let available = false;

  function open() {
    if (!database) {
      database = new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 2);
        request.onupgradeneeded = (event) => {
          const db = request.result;
          if (event.oldVersion < 1) db.createObjectStore(SAVED, { keyPath: 'id' });
          // Keyed by the harvest app's own photo id, so importing a backup twice adds nothing.
          if (event.oldVersion < 2) db.createObjectStore(HARVEST, { keyPath: 'id' });
        };
        request.onsuccess = () => {
          const db = request.result;
          // Another tab with a newer version of the app needs this connection closed.
          db.onversionchange = () => { db.close(); database = null; };
          resolve(db);
        };
        request.onerror = () => { database = null; reject(request.error); };
      });
    }
    return database;
  }

  async function transaction(name, mode, work) {
    const db = await open();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(name, mode);
      let result;
      tx.oncomplete = () => resolve(result);
      tx.onabort = () => reject(tx.error);
      tx.onerror = () => reject(tx.error);
      work(tx.objectStore(name), (value) => { result = value; });
    });
  }

  const getAll = (name) => transaction(name, 'readonly', (store, done) => {
    const request = store.getAll();
    request.onsuccess = () => done(request.result);
  });

  /* Names that differ only by case, accents or punctuation are the same variety. */
  const nameKey = (name) => name.normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

  function newId() {
    if (crypto.randomUUID) return crypto.randomUUID();
    return Array.from(crypto.getRandomValues(new Uint8Array(16)), (b) => b.toString(16).padStart(2, '0')).join('');
  }

  const keepPhotos = () => {
    // Asks the browser not to clear the photos when the phone runs short of space.
    if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
  };

  async function load() {
    try {
      [photos, harvest] = await Promise.all([getAll(SAVED), getAll(HARVEST)]);
      available = true;
    } catch (error) {
      console.error('Saved photos unavailable:', error);
      available = false;
    }
    return available;
  }

  /* `tag` names the model and settings that made the description; only matching ones are compared. */
  async function add({ name, varietyId = null, tag, vector, thumb }) {
    const key = nameKey(name);
    const same = photos.find((photo) => photo.key === key);
    const record = {
      id: newId(),
      name: same ? same.name : name,
      key,
      varietyId,
      tag,
      vector: Float32Array.from(vector),
      thumb,
      savedAt: new Date().toISOString(),
    };
    await transaction(SAVED, 'readwrite', (store) => { store.put(record); });
    photos.push(record);
    keepPhotos();
    return record;
  }

  async function remove(id) {
    await transaction(SAVED, 'readwrite', (store) => { store.delete(id); });
    photos = photos.filter((photo) => photo.id !== id);
  }

  /* Harvest photos */

  /* A harvest photo already described with this model, or undefined. */
  const harvestPhoto = (id, tag) => harvest.find((photo) => photo.id === id && photo.tag === tag);

  /* `source` is 'backup' for an imported file and 'carnet' for one read from the harvest app itself. */
  async function putHarvest({ id, name, carnetVarietyId, day, view, source, tag, vector, thumb }) {
    const record = {
      id,
      name,
      key: nameKey(name),
      carnetVarietyId,
      day,
      view,
      source,
      tag,
      vector: Float32Array.from(vector),
      thumb,
      addedAt: new Date().toISOString(),
    };
    await transaction(HARVEST, 'readwrite', (store) => { store.put(record); });
    harvest = harvest.filter((photo) => photo.id !== id);
    harvest.push(record);
    keepPhotos();
    return record;
  }

  /* Keeps known photos up to date when a variety was renamed in the harvest app, or a backup photo
     is now also read from the app itself. Returns how many changed. */
  async function refreshHarvest(updates) {
    const changed = [];
    for (const { id, name, carnetVarietyId, day, view, source } of updates) {
      const photo = harvest.find((record) => record.id === id);
      // What the harvest app holds now outranks an older backup file.
      if (!photo || (photo.source === 'carnet' && source === 'backup')) continue;
      const next = { ...photo, name, key: nameKey(name), carnetVarietyId, day, view, source: photo.source === 'carnet' ? 'carnet' : source };
      if (next.name !== photo.name || next.day !== photo.day || next.view !== photo.view || next.source !== photo.source) changed.push(next);
    }
    if (!changed.length) return 0;
    await transaction(HARVEST, 'readwrite', (store) => changed.forEach((record) => store.put(record)));
    const byId = new Map(changed.map((record) => [record.id, record]));
    harvest = harvest.map((record) => byId.get(record.id) || record);
    return changed.length;
  }

  async function removeHarvest(ids) {
    const gone = new Set(ids);
    if (!gone.size) return;
    await transaction(HARVEST, 'readwrite', (store) => gone.forEach((id) => store.delete(id)));
    harvest = harvest.filter((photo) => !gone.has(photo.id));
  }

  /* Comparing */

  /* Photos by variety, with the summed descriptions of each view: side, stalk end, eye end, or
     'saved' for photos saved here. */
  function gather(list, length) {
    const varieties = new Map();
    for (const photo of list) {
      if (photo.vector.length !== length) continue;
      if (!varieties.has(photo.key)) {
        varieties.set(photo.key, { name: photo.name, photos: [], saved: 0, harvest: 0, views: new Map() });
      }
      const variety = varieties.get(photo.key);
      variety.photos.push(photo);
      variety[photo.source ? 'harvest' : 'saved'] += 1;
      const view = photo.source ? photo.view || 'any' : 'saved';
      if (!variety.views.has(view)) variety.views.set(view, new Float64Array(length));
      const sum = variety.views.get(view);
      for (let i = 0; i < length; i += 1) sum[i] += photo.vector[i];
    }
    return varieties;
  }

  /* A variety scores as its closest view, where a view is the average of its photos. */
  function scoreOf(variety, query) {
    let best = -1;
    for (const sum of variety.views.values()) {
      let dot = 0;
      let length = 0;
      for (let i = 0; i < sum.length; i += 1) {
        dot += sum[i] * query[i];
        length += sum[i] * sum[i];
      }
      best = Math.max(best, dot / (Math.sqrt(length) || 1));
    }
    return best;
  }

  /* The visitor's varieties, closest first. */
  function rank(query, tag, limit = 3) {
    const varieties = gather([...photos, ...harvest].filter((photo) => photo.tag === tag), query.length);
    return [...varieties.values()].map((variety) => {
      // The single closest photo is shown next to the name, to compare with the fruit.
      let closest = null;
      let closestScore = -2;
      for (const photo of variety.photos) {
        let score = 0;
        for (let i = 0; i < query.length; i += 1) score += photo.vector[i] * query[i];
        if (score > closestScore) { closest = photo; closestScore = score; }
      }
      return {
        name: variety.name,
        saved: variety.saved,
        harvest: variety.harvest,
        score: scoreOf(variety, query),
        thumb: closest && closest.thumb,
      };
    }).sort((a, b) => b.score - a.score).slice(0, limit);
  }

  /* The recognition check, as Carnet de récolte used to do it: each variety is learnt from its
     harvest photos of its first two picking days, then each photo from a later day is ranked like
     an apple to identify, against what was learnt. Test photos are never learnt. Photos saved here
     have no picking day and are left out. */
  function selfTest(tag) {
    const list = harvest.filter((photo) => photo.tag === tag && photo.day);
    const days = new Map();
    for (const photo of list) {
      if (!days.has(photo.key)) days.set(photo.key, new Set());
      days.get(photo.key).add(photo.day);
    }
    const firstDays = new Map([...days].map(([key, set]) => [key, [...set].sort().slice(0, 2)]));
    const isTest = (photo) => !firstDays.get(photo.key).includes(photo.day);
    const length = list.length ? list[0].vector.length : 0;
    const learnt = gather(list.filter((photo) => !isTest(photo)), length);
    const keys = [...learnt.keys()];
    const perVariety = new Map(keys.map((key) => [key, { name: learnt.get(key).name, test: 0, correct: 0, mistakes: new Map() }]));
    const result = { varieties: keys.length, photos: 0, top1: 0, top3: 0 };
    for (const photo of list) {
      // A test day always comes after two learning days, so its variety has been learnt.
      if (!isTest(photo) || photo.vector.length !== length || !learnt.has(photo.key)) continue;
      const own = scoreOf(learnt.get(photo.key), photo.vector);
      let ahead = 0; // other varieties scoring as high or higher: ties count against
      let first = null;
      let firstScore = -Infinity;
      for (const key of keys) {
        if (key === photo.key) continue;
        const score = scoreOf(learnt.get(key), photo.vector);
        if (score >= own) ahead += 1;
        if (score > firstScore) { first = key; firstScore = score; }
      }
      const entry = perVariety.get(photo.key);
      entry.test += 1;
      result.photos += 1;
      if (ahead === 0) {
        entry.correct += 1;
        result.top1 += 1;
      } else {
        entry.mistakes.set(first, (entry.mistakes.get(first) || 0) + 1);
      }
      if (ahead < 3) result.top3 += 1;
    }
    result.perVariety = [...perVariety.values()].map(({ mistakes, ...entry }) => {
      const [confusedWith = null, confusedCount = 0] = [...mistakes].sort((a, b) => b[1] - a[1])[0] || [];
      return { ...entry, confusedWith: confusedWith && learnt.get(confusedWith).name, confusedCount };
    }).sort((a, b) => a.name.localeCompare(b.name, 'fr'));
    return result;
  }

  /* Listing */

  function byVariety(list, date) {
    const byKey = new Map();
    for (const photo of list) {
      if (!byKey.has(photo.key)) byKey.set(photo.key, { name: photo.name, photos: [] });
      byKey.get(photo.key).photos.push(photo);
    }
    for (const group of byKey.values()) group.photos.sort((a, b) => String(b[date]).localeCompare(String(a[date])));
    return [...byKey.values()].sort((a, b) => a.name.localeCompare(b.name, 'fr'));
  }

  return {
    load,
    add,
    remove,
    harvestPhoto,
    putHarvest,
    refreshHarvest,
    removeHarvest,
    rank,
    selfTest,
    nameKey,
    /* Saved photos by variety, varieties in alphabetical order, newest photo first. */
    groups: () => byVariety(photos, 'savedAt'),
    /* Harvest photos described with this model, by variety, latest picking day first. */
    harvestGroups: (tag) => byVariety(harvest.filter((photo) => photo.tag === tag), 'day'),
    harvestIds: (source) => harvest.filter((photo) => photo.source === source).map((photo) => photo.id),
    names: () => [...new Set([...photos, ...harvest].map((photo) => photo.name))],
    harvestCount: (tag) => harvest.filter((photo) => photo.tag === tag).length,
    get available() { return available; },
    get count() { return photos.length; },
  };
})();
