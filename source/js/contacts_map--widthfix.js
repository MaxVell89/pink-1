// Bugfix for Chrome and Opera

var contactsMap = document.querySelector('.contacts__map');
var offer = document.querySelector('.offer');
var review = document.querySelector('.review');
var prevWidth = window.innerWidth;
var prevHeight = window.innerHeight;

window.addEventListener('resize', function() {
  function removeClass() {
    contactsMap.classList.remove('contacts__map--width-fix');
    offer.classList.remove('offer--width-fix');
    review.classList.remove('offer--width-fix');
  }

  if (prevHeight < prevWidth && innerHeight > innerWidth) {
    contactsMap.classList.add('contacts__map--width-fix');
    offer.classList.add('offer--width-fix');
    review.classList.add('offer--width-fix');
    setTimeout(removeClass, 100);
  }
  else if (prevHeight > prevWidth && innerHeight < innerWidth) {
    contactsMap.classList.add('contacts__map--width-fix');
    offer.classList.add('offer--width-fix');
    review.classList.add('offer--width-fix');
    setTimeout(removeClass, 100); // add class only when orientation is changed
  }
  prevWidth = innerWidth;
  prevHeight = innerHeight;
});
