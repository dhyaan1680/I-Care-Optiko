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

// ====== REVIEWS CAROUSEL LOGIC ======
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('reviewsCarousel');
  const track    = carousel.querySelector('.carousel-track');
  const slides   = Array.from(track.children);
  let   currentReviewIndex = 0;

  // Calculate one “slide width” including its left+right margins
  function getSlideWidth() {
    const style = getComputedStyle(slides[0]);
    const margin =
      parseFloat(style.marginLeft) +
      parseFloat(style.marginRight);
    return slides[0].getBoundingClientRect().width + margin;
  }

  // Core move function
  function moveReview(direction) {
    // no carousel on desktop
    if (window.innerWidth >= 768) return;

    currentReviewIndex = (currentReviewIndex + direction + slides.length) % slides.length;
    const slideW = getSlideWidth();

    track.style.transition = 'transform 0.5s ease';
    track.style.transform  = `translateX(-${currentReviewIndex * slideW}px)`;
  }

  // Wire up arrows
  carousel.querySelector('.prev')
    .addEventListener('click', () => moveReview(-1));
  carousel.querySelector('.next')
    .addEventListener('click', () => moveReview(1));

  // Auto‑slide every 7s on mobile
  const autoId = setInterval(() => {
    if (window.innerWidth < 768) moveReview(1);
  }, 7000);

  // Reset on desktop / recalculation on resize
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      track.style.transition = 'none';
      track.style.transform  = 'none';
      currentReviewIndex     = 0;
    } else {
      // Reposition in case slide width changed
      const slideW = getSlideWidth();
      track.style.transition = 'none';
      track.style.transform  = `translateX(-${currentReviewIndex * slideW}px)`;
    }
  });
});
