// Toggling menu on mobile devices
(function() {
  var menuButton, navigationMenu, menuHeader, navigationList;
    menuButton = document.querySelector('.main-nav__button');
    navigationMenu = document.querySelector('.main-nav');
    menuHeader = document.querySelector('.main-nav__menu-header');
    navigationList = document.querySelector('.main-nav__list');

  if (window.matchMedia("(max-width: 1200px)").matches) {
    window.onload = function() {
      navigationMenu.classList.add('main-nav--overlap');
      menuHeader.classList.add('main-nav__menu-header--closed-menu');
      navigationList.classList.add('main-nav__list--closed');
    }
  }

  window.addEventListener('resize', function() {
    if (window.innerWidth > prevWidth && (window.matchMedia("(min-width: 1200px)").matches)) {
      navigationMenu.classList.remove('main-nav--overlap');
      navigationList.classList.remove('main-nav__list--closed');
      menuHeader.classList.remove('main-nav__menu-header--closed-menu');
      menuButton.classList.remove('main-nav__button--close');
    }
    else if (window.innerWidth < prevWidth && (window.matchMedia("(max-width: 1200px)").matches)) {
      navigationMenu.classList.add('main-nav--overlap');
      menuHeader.classList.add('main-nav__menu-header--closed-menu');
      navigationList.classList.add('main-nav__list--closed');
    }
  });

  menuButton.addEventListener('tap', function(event) {
    event.preventDefault();
      menuButton.classList.toggle('main-nav__button--close');
      menuHeader.classList.toggle('main-nav__menu-header--closed-menu');
      navigationList.classList.toggle('main-nav__list--closed');
  });
})();

// Smooth scrolling from menu
(function() {
  var links = document.querySelectorAll('a[href^="#"]'),
      i;

  for (i = 0; i<links.length; i++) {
    links[i].addEventListener('tap', function(event) {
      var timer = 0,
          attrName = this.getAttribute('href').slice(1),
          currentPos = this.parentNode.parentNode.offsetTop + this.offsetTop,
          stopPos = document.getElementById(attrName).offsetTop,
          distance = stopPos - pageYOffset,
          step = Math.round(distance / 50),
          nextStep = 0;

      event.preventDefault();
      for (i = nextStep; i <= stopPos; i+=step) {
        setTimeout(function(){ window.scrollTo(0, nextStep+=step); }, timer * 8);
        timer++;
      }
    }, false);
  }
})();
