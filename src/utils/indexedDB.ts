import { openDB } from "idb";

const dbPromise = openDB("SpinApp", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("results")) {
      db.createObjectStore("results", { keyPath: "id", autoIncrement: true });
    }
  },
});

// Save result to IndexedDB
const saveToIndexedDB = async (code: string, prize: string) => {
  const db = await dbPromise;
  await db.add("results", { code, prize, date: new Date() });
};

// Fetch results from IndexedDB
const fetchFromIndexedDB = async () => {
  const db = await dbPromise;
  return await db.getAll("results");
};