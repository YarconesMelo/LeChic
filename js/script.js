document.querySelectorAll(".carrossel").forEach((carrosselWrapper) => {
  const carrossel = carrosselWrapper.querySelector(".carrossel-fotos");
  const btnNext = carrosselWrapper.querySelector(".right");
  const btnPrev = carrosselWrapper.querySelector(".left");

  const imagens = carrossel.querySelectorAll(".produto");

  let imagensVisiveis = window.innerWidth <= 900 ? 2 : 4;
  window.addEventListener("resize", () => {
    imagensVisiveis = window.innerWidth <= 900 ? 2 : 4;
  });
  let currentIndex = imagensVisiveis;

  for (let i = 0; i < imagensVisiveis; i++) {
    const cloneInicio = imagens[i].cloneNode(true);
    carrossel.appendChild(cloneInicio);

    const cloneFim = imagens[imagens.length - 1 - i].cloneNode(true);
    carrossel.insertBefore(cloneFim, carrossel.firstChild);
  }

  const todasImagens = carrossel.querySelectorAll(".produto");

  setTimeout(() => {
    const largura = todasImagens[0].clientWidth;
    carrossel.style.transform = `translateX(-${currentIndex * largura}px)`;
  }, 100);

  function moverCarrossel() {
    const largura = todasImagens[0].clientWidth;
    carrossel.style.transition = "transform 0.5s ease-in-out";
    carrossel.style.transform = `translateX(-${currentIndex * largura}px)`;
  }

  btnNext.addEventListener("click", () => {
    currentIndex++;
    moverCarrossel();
  });

  btnPrev.addEventListener("click", () => {
    currentIndex--;
    moverCarrossel();
  });

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
});

// ======= MINI CARROSSEL =======
const track = document.querySelector(".msg-track");
const messages = document.querySelectorAll(".msg-item");

let index = 0;

setInterval(() => {
  index++;

  if (index >= messages.length) {
    index = 0;
  }

  track.style.transform = `translateY(-${index * 34}px)`;
}, 3000);
