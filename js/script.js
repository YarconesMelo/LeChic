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

// ======= MENU LATERAL (SIDEBAR) E MODAIS =======
const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const modalBtns = document.querySelectorAll(".open-modal-btn");
const closeModalBtns = document.querySelectorAll(".close-modal-btn");
const modals = document.querySelectorAll(".modal");

function openSidebar(e) {
  if (e) e.preventDefault();
  sidebar.classList.add("active");
  overlay.classList.add("active");
}

function closeAll(e) {
  if (e) e.preventDefault();
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
  modals.forEach((m) => m.classList.remove("active"));
}

menuBtn.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation(); // 🔥 IMPORTANTE no mobile
  openSidebar();
});
closeBtn.addEventListener("click", closeAll);
overlay.addEventListener("click", closeAll);

// Configurar botões que abrem os modais
modalBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const targetModalId = btn.getAttribute("data-modal");
    const targetModal = document.getElementById(targetModalId);

    // Fecha a sidebar mas deixa o overlay ativo para o modal
    sidebar.classList.remove("active");
    overlay.classList.add("active");

    // Abre o modal
    if (targetModal) targetModal.classList.add("active");
  });
});

// Configurar botões que fecham os modais
closeModalBtns.forEach((btn) => {
  btn.addEventListener("click", closeAll);
});
