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
// Keep track of which carousels are animating
const isSliding = {};

// Revised moveSlide
function moveSlide(id, direction) {
  // If this carousel is already sliding, ignore further calls
  if (isSliding[id]) return;
  isSliding[id] = true;

  const track = document.querySelector(`#${id} .carousel-track`);
  const slides = track.children;
  const slideWidth = slides[0].getBoundingClientRect().width;
  const duration = 500; // match your CSS transition-duration

  if (direction === 1) {
    track.style.transition = `transform ${duration}ms ease`;
    track.style.transform = `translateX(-${slideWidth}px)`;

    setTimeout(() => {
      // move first slide to end, reset transform
      track.appendChild(track.firstElementChild);
      track.style.transition = 'none';
      track.style.transform = 'translateX(0)';
      isSliding[id] = false;
    }, duration);

  } else {
    // move last slide to front instantly, then animate back to 0
    track.insertBefore(track.lastElementChild, track.firstElementChild);
    track.style.transition = 'none';
    track.style.transform = `translateX(-${slideWidth}px)`;

    // next frame: animate back to 0
    requestAnimationFrame(() => {
      track.style.transition = `transform ${duration}ms ease`;
      track.style.transform = 'translateX(0)';
    });

    setTimeout(() => {
      isSliding[id] = false;
    }, duration);
  }
}

// Auto‐slide every 3s for each carousel
setInterval(() => moveSlide('celebrityCarousel', 1), 3000);
setInterval(() => moveSlide('storeCarousel',     1), 3000);
