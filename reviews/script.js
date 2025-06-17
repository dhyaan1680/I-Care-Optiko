// Drawer toggle (same as your main site)
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