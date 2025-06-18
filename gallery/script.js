// script.js

document.addEventListener('DOMContentLoaded', () => {
  // ─── DRAWER ──────────────────────────────────────────────
  function openDrawer() {
    document.getElementById('drawer').classList.add('drawer--open');
    document.getElementById('drawerOverlay').classList.add('active');
  }
  function closeDrawer() {
    document.getElementById('drawer').classList.remove('drawer--open');
    document.getElementById('drawerOverlay').classList.remove('active');
  }
  // export for your inline onclicks
  window.openDrawer = openDrawer;
  window.closeDrawer = closeDrawer;

  // ─── CAROUSELS ────────────────────────────────────────────
  const isSliding = {};

  // internal slide logic (takes the actual carousel element)
  function _moveSlide(carouselEl, direction) {
    const id = carouselEl.id;
    if (isSliding[id]) return;
    isSliding[id] = true;

    const track = carouselEl.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const slideWidth = slides[0].getBoundingClientRect().width;
    const duration = 500;

    if (direction === 1) {
      // ▶ next
      track.style.transition = `transform ${duration}ms ease`;
      track.style.transform = `translateX(-${slideWidth}px)`;
      setTimeout(() => {
        track.appendChild(slides[0]);
        track.style.transition = 'none';
        track.style.transform = 'translateX(0)';
        isSliding[id] = false;
      }, duration);

    } else {
      // ◀ prev
      track.insertBefore(slides[slides.length - 1], slides[0]);
      track.style.transition = 'none';
      track.style.transform = `translateX(-${slideWidth}px)`;
      requestAnimationFrame(() => {
        track.style.transition = `transform ${duration}ms ease`;
        track.style.transform = 'translateX(0)';
      });
      setTimeout(() => {
        isSliding[id] = false;
      }, duration);
    }
  }

  // exported for your inline onclicks: moveSlide('carouselId', direction)
  window.moveSlide = function(id, direction) {
    const carouselEl = document.getElementById(id);
    if (carouselEl) _moveSlide(carouselEl, direction);
  };

  // also wire up your prev/next buttons and auto‑slide so both work
  document.querySelectorAll('.carousel').forEach(carouselEl => {
    const prev = carouselEl.querySelector('.prev');
    const next = carouselEl.querySelector('.next');
    if (prev) prev.addEventListener('click', () => _moveSlide(carouselEl, -1));
    if (next) next.addEventListener('click', () => _moveSlide(carouselEl,  1));
    setInterval(() => _moveSlide(carouselEl, 1), 3000);
  });
});
