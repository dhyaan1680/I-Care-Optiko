// Drawer toggle
function openDrawer() {
  document.getElementById('drawer').classList.add('drawer--open');
  document.getElementById('drawerOverlay').classList.add('active');
}
function closeDrawer() {
  document.getElementById('drawer').classList.remove('drawer--open');
  document.getElementById('drawerOverlay').classList.remove('active');
}
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeDrawer();
});

// Carousel Slide (Generic)
function moveSlide(id, direction) {
  const track = document.querySelector(`#${id} .carousel-track`);
  const slides = track.children;
  const slideWidth = slides[0].getBoundingClientRect().width;

  track.ontransitionend = null;

  if (direction === 1) {
    track.style.transition = 'transform 0.5s ease';
    track.style.transform = `translateX(-${slideWidth}px)`;
    track.ontransitionend = () => {
      track.style.transition = 'none';
      track.appendChild(track.firstElementChild);
      track.style.transform = 'translateX(0)';
    };
  } else {
    track.style.transition = 'none';
    track.insertBefore(track.lastElementChild, track.firstElementChild);
    track.style.transform = `translateX(-${slideWidth}px)`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        track.style.transition = 'transform 0.5s ease';
        track.style.transform = 'translateX(0)';
      });
    });
  }
}

// Review carousel logic
// JavaScript
let currentReviewIndex = 0;
const track    = document.querySelector('#reviewsCarousel .carousel-track');
const items    = Array.from(track.children);
const total    = items.length;

// Move one slide left/right on mobile
function moveReview(direction) {
  if (window.innerWidth >= 768) return;        // no-op on desktop
  currentReviewIndex = (currentReviewIndex + direction + total) % total;
  const slideWidth = items[0].getBoundingClientRect().width + 16; // gap adjustment
  track.style.transition = 'transform 0.5s ease';
  track.style.transform = `translateX(-${currentReviewIndex * slideWidth}px)`;
}

// Prev/Next button handlers
document.querySelector('#reviewsCarousel .prev')
  .addEventListener('click', () => moveReview(-1));
document.querySelector('#reviewsCarousel .next')
  .addEventListener('click', () => moveReview(1));

// Auto‑slide every 7s, only on mobile
setInterval(() => {
  if (window.innerWidth < 768) moveReview(1);
}, 7000);

// Reset carousel when switching to desktop
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {
    track.style.transition = 'none';
    track.style.transform  = 'none';
    currentReviewIndex     = 0;
  }
});