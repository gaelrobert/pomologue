'use strict';

/* Photos the visitor names are kept on this phone, in IndexedDB: a small picture and the model's
   description of it. Each new photo is compared with the average description of each of their
   varieties, as in the harvest app's recognition check. Nothing is sent anywhere. */
const Labelled = (() => {
  const DB_NAME = 'pomologue';
  const STORE = 'labelled';
  let database = null;
  let photos = [];
  let available = false;

  function open() {
    if (!database) {
      database = new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);
        request.onupgradeneeded = () => request.result.createObjectStore(STORE, { keyPath: 'id' });
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

  async function transaction(mode, work) {
    const db = await open();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, mode);
      let result;
      tx.oncomplete = () => resolve(result);
      tx.onabort = () => reject(tx.error);
      tx.onerror = () => reject(tx.error);
      work(tx.objectStore(STORE), (value) => { result = value; });
    });
  }

  /* Names that differ only by case, accents or punctuation are the same variety. */
  const nameKey = (name) => name.normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

  function newId() {
    if (crypto.randomUUID) return crypto.randomUUID();
    return Array.from(crypto.getRandomValues(new Uint8Array(16)), (b) => b.toString(16).padStart(2, '0')).join('');
  }

  async function load() {
    try {
      photos = await transaction('readonly', (store, done) => {
        const request = store.getAll();
        request.onsuccess = () => done(request.result);
      });
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
    await transaction('readwrite', (store) => { store.put(record); });
    photos.push(record);
    // Asks the browser not to clear saved photos when the phone runs short of space.
    if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
    return record;
  }

  async function remove(id) {
    await transaction('readwrite', (store) => { store.delete(id); });
    photos = photos.filter((photo) => photo.id !== id);
  }

  /* The visitor's varieties, closest first. */
  function rank(query, tag, limit = 3) {
    const groups = new Map();
    for (const photo of photos) {
      if (photo.tag !== tag || photo.vector.length !== query.length) continue;
      if (!groups.has(photo.key)) groups.set(photo.key, { name: photo.name, count: 0, sum: new Float64Array(query.length) });
      const group = groups.get(photo.key);
      group.count += 1;
      for (let i = 0; i < query.length; i += 1) group.sum[i] += photo.vector[i];
    }
    return [...groups.values()].map(({ name, count, sum }) => {
      let dot = 0;
      let length = 0;
      for (let i = 0; i < sum.length; i += 1) {
        dot += sum[i] * query[i];
        length += sum[i] * sum[i];
      }
      return { name, count, score: dot / (Math.sqrt(length) || 1) };
    }).sort((a, b) => b.score - a.score).slice(0, limit);
  }

  /* Saved photos by variety, varieties in alphabetical order, newest photo first. */
  function groups() {
    const byKey = new Map();
    for (const photo of photos) {
      if (!byKey.has(photo.key)) byKey.set(photo.key, { name: photo.name, photos: [] });
      byKey.get(photo.key).photos.push(photo);
    }
    for (const group of byKey.values()) group.photos.sort((a, b) => b.savedAt.localeCompare(a.savedAt));
    return [...byKey.values()].sort((a, b) => a.name.localeCompare(b.name, 'fr'));
  }

  return {
    load,
    add,
    remove,
    rank,
    groups,
    nameKey,
    names: () => [...new Set(photos.map((photo) => photo.name))],
    get available() { return available; },
    get count() { return photos.length; },
  };
})();
