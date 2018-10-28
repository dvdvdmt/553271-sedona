document.addEventListener('DOMContentLoaded', function () {
  var navEl = document.querySelector('.nav');
  var openBtnEl = document.querySelector('.nav__btn--open');
  var closeBtnEl = document.querySelector('.nav__btn--close');

  openBtnEl.addEventListener('click', function() {
    navEl.classList.add('nav--open');
  });

  closeBtnEl.addEventListener('click', function() {
    navEl.classList.remove('nav--open');
  })
});
