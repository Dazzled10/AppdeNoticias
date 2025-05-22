const apiKey = "02bcc936e8ba47ac88f0a622de3e43d5"; 
const noticiasDiv = document.getElementById("noticias");
const categoriaSelect = document.getElementById("categoria");

async function cargarNoticias(categoria = "general") {
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${categoria}&apiKey=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();

  noticiasDiv.innerHTML = "";

  if (data.articles.length === 0) {
    noticiasDiv.innerHTML = "<p>No hay noticias disponibles.</p>";
    return;
  }

data.articles.slice(0, 6).forEach(noticia => {
  const div = document.createElement("div");
  div.className = "noticia";
  div.innerHTML = `
    <img src="${noticia.urlToImage || 'https://via.placeholder.com/300x150'}" alt="Noticia">
    <h3>${noticia.title}</h3>
    <p>${noticia.description || 'Sin descripción'}</p>
    <a href="${noticia.url}" target="_blank">Leer más</a>
  `;
  noticiasDiv.appendChild(div);
});

}

categoriaSelect.addEventListener("change", () => {
  cargarNoticias(categoriaSelect.value);
});

cargarNoticias();

document.body.addEventListener("pointermove", (e)=>{
  const { currentTarget: el, clientX: x, clientY: y } = e;
  const { top: t, left: l, width: w, height: h } = el.getBoundingClientRect();
  el.style.setProperty('--posX',  x-l-w/2);
  el.style.setProperty('--posY',  y-t-h/2);
})