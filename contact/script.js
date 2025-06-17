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