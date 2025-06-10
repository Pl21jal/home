let urls = JSON.parse(localStorage.getItem("urls")) || [];

function saveUrls() {
  localStorage.setItem("urls", JSON.stringify(urls));
}

function normalizeUrl(url) {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return "https://" + url;
  }
  return url;
}

function renderUrls() {
  const urlList = document.getElementById("urlList");
  urlList.innerHTML = "";

  urls.forEach((rawUrl, index) => {
    const url = normalizeUrl(rawUrl);

    const div = document.createElement("div");
    div.className = "url-item";

    const text = document.createElement("div");
    text.className = "url-text";
    text.textContent = url;

    const openBtn = document.createElement("button");
    openBtn.className = "open-btn";
    openBtn.textContent = "Buka";
    openBtn.onclick = () => location.replace(url); // ganti halaman tanpa simpan di history

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = "🗑️";
    deleteBtn.onclick = () => {
      urls.splice(index, 1);
      saveUrls();
      renderUrls();
    };

    div.appendChild(deleteBtn);
    div.appendChild(text);
    div.appendChild(openBtn);
    urlList.appendChild(div);
  });
}

function addUrl() {
  const input = document.getElementById("newUrl");
  let url = input.value.trim();
  if (!url) return;

  urls.push(url);
  saveUrls();
  renderUrls();
  input.value = "";
}

renderUrls();
