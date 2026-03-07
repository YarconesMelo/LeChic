const carrossel = document.querySelector(".carrossel-fotos");
const btnNext = document.querySelector(".right");
const btnPrev = document.querySelector(".left");

const imagens = document.querySelectorAll(".carrossel-fotos .produto");
let imagensVisiveis = window.innerWidth <= 900 ? 2 : 4;

let currentIndex = imagensVisiveis;

// 🔥 CLONANDO IMAGENS
for (let i = 0; i < imagensVisiveis; i++) {
  const cloneInicio = imagens[i].cloneNode(true);
  carrossel.appendChild(cloneInicio);

  const cloneFim = imagens[imagens.length - 1 - i].cloneNode(true);
  carrossel.insertBefore(cloneFim, carrossel.firstChild);
}

const todasImagens = document.querySelectorAll(".carrossel-fotos .produto");

// posição inicial correta
window.onload = () => {
  const largura = todasImagens[0].clientWidth;
  carrossel.style.transform = `translateX(-${currentIndex * largura}px)`;
};

// botão next
btnNext.addEventListener("click", () => {
  currentIndex++;
  moverCarrossel();
});

// botão prev
btnPrev.addEventListener("click", () => {
  currentIndex--;
  moverCarrossel();
});

function moverCarrossel() {
  const largura = todasImagens[0].clientWidth;
  carrossel.style.transition = "transform 0.5s ease-in-out";
  carrossel.style.transform = `translateX(-${currentIndex * largura}px)`;
}

// 🔥 reset invisível
carrossel.addEventListener("transitionend", () => {
  const largura = todasImagens[0].clientWidth;

  if (currentIndex >= todasImagens.length - imagensVisiveis) {
    carrossel.style.transition = "none";
    currentIndex = imagensVisiveis;
    carrossel.style.transform = `translateX(-${currentIndex * largura}px)`;
  }

  if (currentIndex <= 0) {
    carrossel.style.transition = "none";
    currentIndex = todasImagens.length - imagensVisiveis * 2;
    carrossel.style.transform = `translateX(-${currentIndex * largura}px)`;
  }
});

window.addEventListener("resize", () => {
  imagensVisiveis = window.innerWidth <= 900 ? 2 : 4;

  const largura = todasImagens[0].clientWidth;

  carrossel.style.transition = "none";
  carrossel.style.transform = `translateX(-${currentIndex * largura}px)`;
});

let startX = 0;
let endX = 0;

carrossel.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

carrossel.addEventListener("touchmove", (e) => {
  endX = e.touches[0].clientX;
});

carrossel.addEventListener("touchend", () => {
  const diferenca = startX - endX;

  // Se arrastou mais que 50px
  if (diferenca > 50) {
    currentIndex++;
    moverCarrossel();
  }

  if (diferenca < -50) {
    currentIndex--;
    moverCarrossel();
  }
});
