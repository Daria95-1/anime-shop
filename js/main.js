document.addEventListener('DOMContentLoaded', () => {
  const heroCard = document.querySelector('.hero__card');
  const heroArrowLeft = document.querySelector('.hero__arrow--left');
  const heroArrowRight = document.querySelector('.hero__arrow--right');

  heroArrowLeft.addEventListener('click', () => {
    heroCard.classList.add('is-anim-left');
    setTimeout(() => heroCard.classList.remove('is-anim-left'), 420);
  });

  heroArrowRight.addEventListener('click', () => {
    heroCard.classList.add('is-anim-right');
    setTimeout(() => heroCard.classList.remove('is-anim-right'), 420);
  });

  // Новинки arrows
  const newProductsInner = document.querySelector('.new-products__inner');
  const newArrowLeft = document.querySelector('.new-products__arrow--left');
  const newArrowRight = document.querySelector('.new-products__arrow--right');

  newArrowLeft.addEventListener('click', () => {
    newProductsInner.classList.add('is-anim-left');
    newProductsInner.scrollBy({ left: -320, behavior: 'smooth' });
    setTimeout(() => newProductsInner.classList.remove('is-anim-left'), 420);
  });

  newArrowRight.addEventListener('click', () => {
    newProductsInner.classList.add('is-anim-right');
    newProductsInner.scrollBy({ left: 320, behavior: 'smooth' });
    setTimeout(() => newProductsInner.classList.remove('is-anim-right'), 420);
  });

  // Работа с шапкой при скролле
  const header = document.querySelector('.site-header__inner');
  const hero = document.querySelector('.hero__card');

  if (header && hero) {
    const heroHeight = hero.offsetHeight;

    window.addEventListener('scroll', () => {
      if (window.scrollY > heroHeight * 0.85) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // ===== Подменю =====
    // ===== Подменю =====
  const navItems = document.querySelectorAll('.nav__item');
  const submenu = document.querySelector('.submenu');

  if (navItems.length && submenu) {
    let isOverNav = false;
    let isOverSubmenu = false;

    function updateSubmenu() {
      if (isOverNav || isOverSubmenu) {
        submenu.style.display = 'grid';
      } else {
        submenu.style.display = 'none';
      }
    }

    navItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        isOverNav = true;
        submenu.classList.add('visible');
      });
      item.addEventListener('mouseleave', () => {
        isOverNav = false;
        if (!isOverSubmenu) submenu.classList.remove('visible');
      });
    });

    submenu.addEventListener('mouseenter', () => {
      isOverSubmenu = true;
      submenu.classList.add('visible');
    });
    submenu.addEventListener('mouseleave', () => {
      isOverSubmenu = false;
      if (!isOverNav) submenu.classList.remove('visible');
    });
  }

  // ===== Модалка обратного звонка =====
  const modal = document.getElementById('callbackModal');
  const closeBtn = document.getElementById('modalClose');
  const submitBtn = document.getElementById('submitBtn');
  const inputs = [document.getElementById('nameInput'), document.getElementById('phoneInput')];
  const phoneLink = document.querySelector('.contact--phone');

  // Открытие модалки
  phoneLink.addEventListener('click', function(e) {
    e.preventDefault();
    modal.classList.add('show'); // Добавляем класс 'show', чтобы показать модалку
  });

  // Закрытие модалки
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
  });

  // Закрытие по клику на подложку
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('show');
  });

  // Включение кнопки отправки
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      submitBtn.disabled = inputs.some(i => !i.value);
    });
  });
});
