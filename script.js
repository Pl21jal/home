// Konfigurasi Firebase punyamu
const firebaseConfig = {
  apiKey: "AIzaSyD71kfIbiD29N6BBMChfkCPuBBp7QXFdZ0",
  authDomain: "home-55a24.firebaseapp.com",
  databaseURL: "https://home-55a24-default-rtdb.firebaseio.com",
  projectId: "home-55a24",
  storageBucket: "home-55a24.firebasestorage.app",
  messagingSenderId: "413597540751",
  appId: "1:413597540751:web:6b7e8c5a9ffe278973abfa",
  measurementId: "G-V8D4PNN6SX"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const urlsRef = db.ref("urls");

// Fungsi bantu
function normalizeUrl(url) {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return "https://" + url;
  }
  return url;
}

// Tampilkan URL yang tersimpan
function renderUrls(urls) {
  const urlList = document.getElementById("urlList");
  urlList.innerHTML = "";
  urls.forEach((urlObj) => {
    const url = normalizeUrl(urlObj.url);
    const div = document.createElement("div");
    div.className = "url-item";

    const text = document.createElement("div");
    text.className = "url-text";
    text.textContent = url;

    const openBtn = document.createElement("button");
    openBtn.className = "open-btn";
    openBtn.textContent = "Buka";
    openBtn.onclick = () => location.replace(url);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = "🗑️";
    deleteBtn.onclick = () => {
      urlsRef.child(urlObj.id).remove();
    };

    div.appendChild(deleteBtn);
    div.appendChild(text);
    div.appendChild(openBtn);
    urlList.appendChild(div);
  });
}

// Tambah URL baru
function addUrl() {
  const input = document.getElementById("newUrl");
  const raw = input.value.trim();
  if (!raw) return;
  const url = normalizeUrl(raw);
  const newRef = urlsRef.push();
  newRef.set({ id: newRef.key, url });
  input.value = "";
}

// Sinkronisasi realtime dengan Firebase
urlsRef.on("value", (snapshot) => {
  const data = snapshot.val();
  const urls = data ? Object.values(data) : [];
  renderUrls(urls);
});
