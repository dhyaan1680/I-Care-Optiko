// Drawer
function openDrawer() {
  document.getElementById('drawer').classList.add('drawer--open');
  document.getElementById('drawerOverlay').classList.add('active');
}
function closeDrawer() {
  document.getElementById('drawer').classList.remove('drawer--open');
  document.getElementById('drawerOverlay').classList.remove('active');
}

// Carousel logic (exact main‑page code)
function moveSlide(id, direction) {
  const track = document.querySelector(`#${id} .carousel-track`);
  const slides = track.children;
  const slideWidth = slides[0].getBoundingClientRect().width;

  if (direction === 1) {
    track.style.transition = 'transform 0.5s ease';
    track.style.transform = `translateX(-${slideWidth}px)`;
    setTimeout(() => {
      track.appendChild(track.firstElementChild);
      track.style.transition = 'none';
      track.style.transform = 'translateX(0)';
    }, 500);
  } else {
    track.insertBefore(track.lastElementChild, track.firstElementChild);
    track.style.transition = 'none';
    track.style.transform = `translateX(-${slideWidth}px)`;
    requestAnimationFrame(() => {
      track.style.transition = 'transform 0.5s ease';
      track.style.transform = 'translateX(0)';
    });
  }
}

// Auto-slide
setInterval(() => moveSlide('celebrityCarousel', 1), 3000);
setInterval(() => moveSlide('storeCarousel', 1), 3000);