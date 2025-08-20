document.addEventListener('DOMContentLoaded', () => {
  // ===== Hero слайдер =====
  const heroCard = document.querySelector('.hero__card');
  const heroArrowLeft = document.querySelector('.hero__arrow--left');
  const heroArrowRight = document.querySelector('.hero__arrow--right');

  if (heroCard && heroArrowLeft && heroArrowRight) {
    heroArrowLeft.addEventListener('click', () => {
      heroCard.classList.add('is-anim-left');
      setTimeout(() => heroCard.classList.remove('is-anim-left'), 420);
    });

    heroArrowRight.addEventListener('click', () => {
      heroCard.classList.add('is-anim-right');
      setTimeout(() => heroCard.classList.remove('is-anim-right'), 420);
    });
  }

  // ===== Новинки слайдер =====
  const container = document.querySelector('.products');
  const btnLeft = document.querySelector('.new-products__arrow--left');
  const btnRight = document.querySelector('.new-products__arrow--right');

  function getScrollAmount(container) {
    const card = container.querySelector('.product-card');
    if (!card) return 0;
    const style = getComputedStyle(container);
    const gap = parseInt(style.gap) || 20;
    return card.offsetWidth + gap;
  }

  if (container && btnLeft && btnRight) {
    btnLeft.addEventListener('click', () => {
      container.scrollBy({ left: -getScrollAmount(container), behavior: 'smooth' });
    });

    btnRight.addEventListener('click', () => {
      container.scrollBy({ left: getScrollAmount(container), behavior: 'smooth' });
    });
  }

  // ===== Мобильная пагинация =====
  function initMobilePagination() {
    const pagination = document.querySelector('.products-pagination');
    if (!container || !pagination) return;

    const dots = Array.from(pagination.querySelectorAll('.products-pagination__dot'));

    function updateActiveDot() {
      const scrollLeft = container.scrollLeft;
      const scrollAmount = getScrollAmount(container);
      const activeIndex = Math.round(scrollLeft / scrollAmount);
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
      });
    }

    container.addEventListener('scroll', updateActiveDot);

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        container.scrollTo({ left: getScrollAmount(container) * index, behavior: 'smooth' });
      });
    });

    updateActiveDot();
  }

  initMobilePagination();

  // ===== Шапка при скролле =====
  const header = document.querySelector('.site-header');
  const hero = document.querySelector('.hero__card');

  if (header && hero) {
    const heroHeight = hero.offsetHeight;

    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > heroHeight * 0.85);
    });
  }

  // ===== Подменю =====
  const navItems = document.querySelectorAll('.nav__item');
const submenu = document.querySelector('.submenu');

if (navItems.length && submenu) {
  let isOverNavOrSubmenu = false;

  function showSubmenu() {
    submenu.classList.add('visible');
  }

  function hideSubmenu() {
    submenu.classList.remove('visible');
  }

  navItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      isOverNavOrSubmenu = true;
      showSubmenu();
    });
    item.addEventListener('mouseleave', () => {
      isOverNavOrSubmenu = false;
      setTimeout(() => {
        if (!isOverNavOrSubmenu) hideSubmenu();
      }, 50);
    });
  });

  submenu.addEventListener('mouseenter', () => {
    isOverNavOrSubmenu = true;
    showSubmenu();
  });
  submenu.addEventListener('mouseleave', () => {
    isOverNavOrSubmenu = false;
    setTimeout(() => {
      if (!isOverNavOrSubmenu) hideSubmenu();
    }, 50);
  });
  }

  // ===== Модалка обратного звонка =====
  const modal = document.getElementById('callbackModal');
  const closeBtn = document.getElementById('modalClose');
  const submitBtn = document.getElementById('submitBtn');
  const inputs = [document.getElementById('nameInput'), document.getElementById('phoneInput')];
  const phoneLink = document.querySelector('.contact--phone');

  if (phoneLink && modal) {
    phoneLink.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('show');
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('show');
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('show');
    });
  }

  if (submitBtn && inputs.every(Boolean)) {
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        submitBtn.disabled = inputs.some(i => !i.value);
      });
    });
  }
});
