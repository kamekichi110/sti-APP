const DB_NAME = "trackDB";
const DB_VERSION = 1;
let db;

// データベース初期化
function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      db = event.target.result;

      // infoテーブルの作成
      if (!db.objectStoreNames.contains("info")) {
        const store = db.createObjectStore("info", { keyPath: "id", autoIncrement: true });
        store.createIndex("type", "type", { unique: false });
        store.createIndex("title", "title", { unique: false });
        store.createIndex("fileData", "fileData", { unique: false });
      }

      // settingsテーブルの作成
      if (!db.objectStoreNames.contains("settings")) {
        db.createObjectStore("settings", { keyPath: "key" });
      }
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };

    request.onerror = (event) => {
      console.error("Database error:", event.target.error);
      reject(event.target.error);
    };
  });
}

// トラックデータを保存
function saveTrackData(trackData) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("info", "readwrite");
    const store = transaction.objectStore("info");

    const request = store.add(trackData);
    request.onsuccess = () => resolve(request.result);
    request.onerror = (event) => reject(event.target.error);
  });
}

// 設定を保存
function saveSettings(key, value) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("settings", "readwrite");
    const store = transaction.objectStore("settings");

    const request = store.put({ key, value });
    request.onsuccess = () => resolve(request.result);
    request.onerror = (event) => reject(event.target.error);
  });
}

// 設定を取得
function getSettings(key) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("settings", "readonly");
    const store = transaction.objectStore("settings");

    const request = store.get(key);
    request.onsuccess = () => resolve(request.result ? request.result.value : null);
    request.onerror = (event) => reject(event.target.error);
  });
}
