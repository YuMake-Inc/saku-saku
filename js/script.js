// メニュー開閉
function toggleNav() {
  var body = document.body;
  var hamburger = document.getElementById('menujs');
  var blackBg = document.getElementById('black-bg');

  hamburger.addEventListener('click', function() {
    body.classList.toggle('nav-open');
  });
  blackBg.addEventListener('click', function() {
    body.classList.remove('nav-open');
  });
}
toggleNav();

