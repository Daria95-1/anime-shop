document.addEventListener('DOMContentLoaded', () => {
  // ===== Hero слайдер =====
  const heroCard = document.querySelector('.hero__card');
  const heroArrowLeft = document.querySelector('.hero__arrow--left');
  const heroArrowRight = document.querySelector('.hero__arrow--right');

  if (heroCard) {
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

  function getScrollAmount() {
    const card = container.querySelector('.product-card');
    if (!card) return 0;
    const style = getComputedStyle(container);
    const gap = parseInt(style.gap) || 20;
    return card.offsetWidth + gap;
  }

  btnLeft.addEventListener('click', () => {
    container.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
  });

  btnRight.addEventListener('click', () => {
    container.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
  });

  function initMobilePagination() {
    const container = document.querySelector('.products');
    const pagination = document.querySelector('.products-pagination');
    if (!container || !pagination) return;

    const cards = container.querySelectorAll('.product-card');
    const cardWidth = cards[0]?.offsetWidth || 0;
    const gap = parseInt(getComputedStyle(container).gap) || 0;
    const scrollStep = cardWidth + gap;
    const totalPages = Math.ceil(container.scrollWidth / scrollStep);

    pagination.innerHTML = '';
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement('div');
      dot.classList.add('products-pagination__dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        container.scrollTo({ left: i * scrollStep, behavior: 'smooth' });
      });
      pagination.appendChild(dot);
    }

  container.addEventListener('scroll', () => {
    const index = Math.round(container.scrollLeft / scrollStep);
    pagination.querySelectorAll('.products-pagination__dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  });
}

  if (window.innerWidth <= 360) {
    initMobilePagination();
  }

  // ===== Шапка при скролле =====
  const header = document.querySelector('.site-header');
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
  const navItems = document.querySelectorAll('.nav__item');
  const submenu = document.querySelector('.submenu');

  if (navItems.length && submenu) {
    let isOverNav = false;
    let isOverSubmenu = false;

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

  if (phoneLink) {
    phoneLink.addEventListener('click', function(e) {
      e.preventDefault();
      modal.classList.add('show');
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('show');
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('show');
    });
  }

  inputs.forEach(input => {
    input.addEventListener('input', () => {
      submitBtn.disabled = inputs.some(i => !i.value);
    });
  });
});
