// ГАМБУРГЕР-МЕНЮ
const burgerBtn = document.getElementById('burger-btn');
const mobileMenu = document.getElementById('mobile-menu');

burgerBtn.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  burgerBtn.classList.toggle('open', isOpen);
  burgerBtn.setAttribute('aria-expanded', isOpen);
});

// Закрываем меню при клике на любую ссылку внутри
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    burgerBtn.classList.remove('open');
    burgerBtn.setAttribute('aria-expanded', false);
  });
});

// Закрываем меню при клике вне него
document.addEventListener('click', (e) => {
  if (!mobileMenu.contains(e.target) && !burgerBtn.contains(e.target)) {
    mobileMenu.classList.remove('open');
    burgerBtn.classList.remove('open');
    burgerBtn.setAttribute('aria-expanded', false);
  }
});


// НАСТРОЙКА ЯЗЫКОВОГО ПЕРЕКЛЮЧАТЕЛЯ
const btnEn = document.getElementById('btn-en');
const btnDe = document.getElementById('btn-de');
const cvDownloadLink = document.getElementById('cv-download-link');

function setLanguage(lang) {
  if (lang === 'de') {
    document.body.classList.remove('lang-en');
    document.body.classList.add('lang-de');
    btnDe.classList.add('active');
    btnEn.classList.remove('active');
    cvDownloadLink.setAttribute('href', 'assets/cv-de.pdf');
  } else {
    document.body.classList.remove('lang-de');
    document.body.classList.add('lang-en');
    btnEn.classList.add('active');
    btnDe.classList.remove('active');
    cvDownloadLink.setAttribute('href', 'assets/cv-en.pdf');
  }
  localStorage.setItem('preferredLang', lang);
}

btnEn.addEventListener('click', () => setLanguage('en'));
btnDe.addEventListener('click', () => setLanguage('de'));

const savedLang = localStorage.getItem('preferredLang') || 'en';
setLanguage(savedLang);


// БЕСКОНЕЧНАЯ КАРУСЕЛЬ (СКВОЗНАЯ ПРОКРУТКА)
const track = document.getElementById('carousel-track');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let index = 0;

function getCardsPerView() {
  if (window.innerWidth <= 600) return 1;
  if (window.innerWidth <= 900) return 2;
  return 3;
}

function updateCarousel() {
  const cards = document.querySelectorAll('.card');
  if (cards.length === 0) return;
  
  const cardWidth = cards[0].getBoundingClientRect().width + 20; // 20px - это gap
  track.style.transform = `translateX(${-index * cardWidth}px)`;
}

nextBtn.addEventListener('click', () => {
  const cards = document.querySelectorAll('.card');
  const cardsPerView = getCardsPerView();
  const maxIndex = cards.length - cardsPerView;

  if (index < maxIndex) {
    index++;
  } else {
    index = 0; // Возвращаемся в самое начало
  }
  updateCarousel();
});

prevBtn.addEventListener('click', () => {
  const cards = document.querySelectorAll('.card');
  const cardsPerView = getCardsPerView();
  const maxIndex = cards.length - cardsPerView;

  if (index > 0) {
    index--;
  } else {
    index = maxIndex; // Переходим в самый конец
  }
  updateCarousel();
});

window.addEventListener('resize', () => {
  index = 0; // Сбрасываем индекс при изменении экрана во избежание багов
  updateCarousel();
});

// Первичный запуск карусели
updateCarousel();


// АНИМАЦИЯ ПОЯВЛЕНИЯ (FADE-IN) ПРИ ПРОКРУТКЕ
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('appear');
      fadeObserver.unobserve(entry.target); // Достаточно сработать один раз
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));