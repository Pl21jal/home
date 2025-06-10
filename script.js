let urls = JSON.parse(localStorage.getItem("urls")) || [];

function saveUrls() {
  localStorage.setItem("urls", JSON.stringify(urls));
}

function renderUrls() {
  const urlList = document.getElementById("urlList");
  urlList.innerHTML = "";

  urls.forEach((url, index) => {
    const div = document.createElement("div");
    div.className = "url-item";

    const text = document.createElement("div");
    text.textContent = url;

    const openBtn = document.createElement("button");
    openBtn.textContent = "Buka";
    openBtn.onclick = () => location.replace(url); // replace supaya tidak tercatat di history

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Hapus";
    deleteBtn.onclick = () => {
      urls.splice(index, 1);
      saveUrls();
      renderUrls();
    };

    div.appendChild(text);
    div.appendChild(openBtn);
    div.appendChild(deleteBtn);
    urlList.appendChild(div);
  });
}

function addUrl() {
  const input = document.getElementById("newUrl");
  const url = input.value.trim();
  if (!url) return;
  urls.push(url);
  saveUrls();
  renderUrls();
  input.value = "";
}

renderUrls();
