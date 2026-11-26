'use strict';

/* Photos from the Carnet de récolte app, read in two ways:
   - from its backup files (ZIP files with a manifest.json), which works on every phone;
   - straight from its storage, when this browser shares it (same website, same browser).
   Both only read. Nothing in Carnet de récolte is ever changed, and nothing is sent anywhere. */
const Carnet = (() => {
  const DB_NAME = 'carnet-recolte';
  const MAX_MANIFEST = 32 * 1024 * 1024;
  const VIEWS = new Set(['side', 'stem', 'eye']);

  /* Backup files */

  class BackupError extends Error {
    constructor(key, detail) {
      super(detail || key);
      this.key = key; // a message key: notBackup or unreadable
    }
  }

  async function bytes(blob, start, end) {
    return new DataView(await blob.slice(start, end).arrayBuffer());
  }

  const decoder = new TextDecoder();

  /* The list of files at the end of the ZIP, without reading the photos themselves. */
  async function entries(file) {
    const tailStart = Math.max(0, file.size - 65557); // end record (22 bytes) and the longest comment
    const tail = await bytes(file, tailStart, file.size);
    let end = -1;
    for (let i = tail.byteLength - 22; i >= 0; i -= 1) {
      if (tail.getUint32(i, true) === 0x06054b50) { end = i; break; }
    }
    if (end < 0) throw new BackupError('notBackup', 'not a ZIP file');
    const count = tail.getUint16(end + 10, true);
    const size = tail.getUint32(end + 12, true);
    const offset = tail.getUint32(end + 16, true);
    if (offset === 0xffffffff || size === 0xffffffff || offset + size > file.size) {
      throw new BackupError('unreadable', 'unsupported ZIP layout');
    }
    const central = await bytes(file, offset, offset + size);
    const list = [];
    let at = 0;
    for (let n = 0; n < count; n += 1) {
      if (at + 46 > central.byteLength || central.getUint32(at, true) !== 0x02014b50) {
        throw new BackupError('unreadable', 'damaged file list');
      }
      const nameLength = central.getUint16(at + 28, true);
      const skip = nameLength + central.getUint16(at + 30, true) + central.getUint16(at + 32, true);
      list.push({
        name: decoder.decode(new Uint8Array(central.buffer, central.byteOffset + at + 46, nameLength)),
        method: central.getUint16(at + 10, true),
        packed: central.getUint32(at + 20, true),
        size: central.getUint32(at + 24, true),
        local: central.getUint32(at + 42, true),
      });
      at += 46 + skip;
    }
    return list;
  }

  /* One file's contents. Carnet de récolte stores files as they are; a ZIP made again by another
     program may compress them, which needs a browser that can decompress (iOS 16.4 and later). */
  async function contents(file, entry, type) {
    const header = await bytes(file, entry.local, entry.local + 30);
    if (header.getUint32(0, true) !== 0x04034b50) throw new BackupError('unreadable', `damaged entry ${entry.name}`);
    const start = entry.local + 30 + header.getUint16(26, true) + header.getUint16(28, true);
    const packed = file.slice(start, start + entry.packed, type);
    if (entry.method === 0) return packed;
    if (entry.method === 8 && typeof DecompressionStream === 'function') {
      const stream = packed.stream().pipeThrough(new DecompressionStream('deflate-raw'));
      return new Blob([await new Response(stream).arrayBuffer()], { type });
    }
    throw new BackupError('unreadable', `compression ${entry.method} not supported`);
  }

  const viewOf = (view) => (VIEWS.has(view) ? view : null);

  /* The photos in one backup file: their details, and a way to get each image when it is needed. */
  async function readBackup(file) {
    const list = await entries(file);
    const manifestEntry = list.find((entry) => entry.name === 'manifest.json');
    if (!manifestEntry || manifestEntry.size > MAX_MANIFEST) throw new BackupError('notBackup', 'no manifest.json');
    let manifest;
    try {
      manifest = JSON.parse(await (await contents(file, manifestEntry, 'application/json')).text());
    } catch (error) {
      if (error instanceof BackupError) throw error;
      throw new BackupError('notBackup', 'manifest.json is not readable');
    }
    if (!manifest || manifest.format !== 'carnet-recolte' || !Array.isArray(manifest.photos)) {
      throw new BackupError('notBackup', 'not made by Carnet de récolte');
    }
    const byName = new Map(list.map((entry) => [entry.name, entry]));
    const photos = [];
    let missing = 0;
    for (const photo of manifest.photos) {
      const entry = photo && byName.get(photo.file);
      const name = photo && typeof photo.variety === 'string' ? photo.variety.trim().replace(/\s+/g, ' ').slice(0, 80) : '';
      if (!entry || !name || typeof photo.id !== 'string') { missing += 1; continue; }
      photos.push({
        id: photo.id,
        name,
        carnetVarietyId: typeof photo.varietyId === 'string' ? photo.varietyId : null,
        day: typeof photo.day === 'string' ? photo.day : null,
        view: viewOf(photo.view),
        image: () => contents(file, entry, 'image/jpeg'),
      });
    }
    return { photos, missing, part: manifest.part || 1, parts: manifest.parts || 1 };
  }

  /* The same storage, when this browser shares it */

  /* Never creates the harvest app's storage: if it is not there, opening is cancelled. */
  function openStore() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME);
      request.onupgradeneeded = () => request.transaction.abort();
      request.onsuccess = () => {
        const db = request.result;
        db.onversionchange = () => db.close(); // the harvest app is updating its storage
        resolve(db);
      };
      request.onerror = () => reject(request.error);
      request.onblocked = () => reject(new Error('blocked'));
    });
  }

  function readAll(db, store) {
    return new Promise((resolve, reject) => {
      const request = db.transaction(store, 'readonly').objectStore(store).getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  function readOne(db, store, key) {
    return new Promise((resolve, reject) => {
      const request = db.transaction(store, 'readonly').objectStore(store).get(key);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  /* The harvest app's photos, or null when its storage is not reachable from here.
     On iPhones each Home Screen app usually has storage of its own, so this is mostly for other phones. */
  async function readDirect() {
    try {
      if (!indexedDB.databases) return null;
      const known = await indexedDB.databases();
      if (!known.some((entry) => entry.name === DB_NAME)) return null;
      const db = await openStore();
      const names = db.objectStoreNames;
      if (!names.contains('varieties') || !names.contains('photos') || !names.contains('images')) {
        db.close();
        return null;
      }
      const varieties = new Map((await readAll(db, 'varieties')).map((variety) => [variety.id, variety.name]));
      const photos = (await readAll(db, 'photos'))
        .filter((photo) => photo && typeof photo.id === 'string' && varieties.has(photo.varietyId))
        .map((photo) => ({
          id: photo.id,
          name: String(varieties.get(photo.varietyId)).trim().replace(/\s+/g, ' ').slice(0, 80),
          carnetVarietyId: photo.varietyId,
          day: typeof photo.day === 'string' ? photo.day : null,
          view: viewOf(photo.view),
          image: async () => {
            const blob = await readOne(db, 'images', photo.id);
            if (!(blob instanceof Blob)) throw new Error('photo missing in Carnet de récolte');
            return blob;
          },
        }))
        .filter((photo) => photo.name);
      return { photos, close: () => db.close() };
    } catch (error) {
      console.error('Carnet de récolte not readable here:', error);
      return null;
    }
  }

  return { readBackup, readDirect, BackupError };
})();
