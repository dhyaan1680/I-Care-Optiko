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
  // wire drawer buttons (assumes you have elements with IDs 'openBtn' and 'closeBtn' or similar)
  document.getElementById('openDrawerBtn')?.addEventListener('click', openDrawer);
  document.getElementById('closeDrawerBtn')?.addEventListener('click', closeDrawer);
  document.getElementById('drawerOverlay')?.addEventListener('click', closeDrawer);

  // ─── CAROUSELS ────────────────────────────────────────────
  const isSliding = {};

  function moveSlide(carouselEl, direction) {
    const id = carouselEl.id;
    if (isSliding[id]) return;
    isSliding[id] = true;

    const track = carouselEl.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const slideWidth = slides[0].getBoundingClientRect().width;
    const duration = 500;

    if (direction === 1) {
      // next
      track.style.transition = `transform ${duration}ms ease`;
      track.style.transform = `translateX(-${slideWidth}px)`;
      setTimeout(() => {
        track.appendChild(slides[0]);
        track.style.transition = 'none';
        track.style.transform = 'translateX(0)';
        isSliding[id] = false;
      }, duration);

    } else {
      // prev
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

  document.querySelectorAll('.carousel').forEach(carouselEl => {
    // buttons
    carouselEl.querySelectorAll('.carousel-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const dir = parseInt(btn.dataset.direction, 10);
        moveSlide(carouselEl, dir);
      });
    });
    // auto‑slide
    setInterval(() => moveSlide(carouselEl, 1), 3000);
  });
});
