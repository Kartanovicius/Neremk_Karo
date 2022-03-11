/* Open */
function openNav() {
    document.querySelector('.header__overlay').style.height = '100%';
}

/* Close */
function closeNav() {
    document.querySelector('.header__overlay').style.height = '0%';
}

document.addEventListener('swiped-up', function(e) {
    if (document.querySelector('.header__overlay').style.height === '100%') {
        document.querySelector('.header__overlay').style.height = '0%'
    }
  });