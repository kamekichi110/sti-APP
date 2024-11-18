const dbName = "TracklistDB";
let db;

function openDatabase() {
  const request = indexedDB.open(dbName, 1);

  request.onupgradeneeded = function (event) {
    db = event.target.result;
    const objectStore = db.createObjectStore("tracks", { keyPath: "id", autoIncrement: true });
    objectStore.createIndex("name", "name", { unique: false });
  };

  request.onsuccess = function (event) {
    db = event.target.result;
  };
}

function saveTrack(track) {
  const transaction = db.transaction(["tracks"], "readwrite");
  const objectStore = transaction.objectStore("tracks");
  objectStore.add(track);
}
