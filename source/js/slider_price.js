// Price slider script
(function(){

  var prices = document.querySelector('.price'),
      prevWidth = window.innerWidth,
      i;

  function priceSlider(container) {

    var priceItems = container.querySelectorAll('.slider__price-item'),
        priceItemsQuantity = priceItems.length,
        dotsContainer = container.querySelector('.slider__toggle'),
        swipeArea = new Hammer(container),
        itemList, activeItem, activeItemIndex;

    priceItems[1].classList.add('slider__price-item--active');

    itemList = Array.prototype.slice.call(priceItems);
    activeItem = container.getElementsByClassName('slider__price-item--active');
    activeItemIndex = itemList.indexOf(activeItem[0]);

    function setActiveDot() {
      var dots = dotsContainer.querySelectorAll('span'),
          dotsQuantity = dots.length;
      for (i = 0; i < dotsQuantity; i++) {
        dots[i].classList.remove('slider__button--active');
      }
      dots[activeItemIndex].classList.add('slider__button--active');
    }

    function removeMovingClasses() {
      for (i = 0; i < priceItems.length; i++) {
        priceItems[i].classList.remove('slider__slide--forward-out');
        priceItems[i].classList.remove('slider__slide--forward-in');
        priceItems[i].classList.remove('slider__slide--backward-out');
        priceItems[i].classList.remove('slider__slide--backward-in');
        priceItems[i].classList.remove('slider__price-item--active');
      } // one by one class removal is used for IE support
    }

    function moveBackward() {
      removeMovingClasses();
      if (activeItemIndex <= 0) {
        priceItems[0].classList.add('slider__price-item--active');
      }
      else {
        priceItems[activeItemIndex].classList.add('slider__slide--backward-out');
        priceItems[activeItemIndex].style.left = '100%';
        activeItemIndex = activeItemIndex - 1;

        if (activeItemIndex > 0) {
          priceItems[activeItemIndex - 1].style.left = '-100%';
        }
      }
      priceItems[activeItemIndex].classList.add('slider__price-item--active');
      priceItems[activeItemIndex].classList.add('slider__slide--backward-in');
      priceItems[activeItemIndex].style.left = '0';
    } // one by one class adding is used for IE support

    function moveForward() {
      removeMovingClasses();
      if (activeItemIndex >= (priceItemsQuantity - 1)) {
        priceItems[priceItemsQuantity - 1].classList.add('slider__price-item--active');
      }
      else {
        activeItemIndex = activeItemIndex + 1;
        priceItems[activeItemIndex].classList.add('slider__slide--forward-in');
        priceItems[activeItemIndex - 1].classList.add('slider__slide--forward-out');
        priceItems[activeItemIndex - 1].style.left = '-100%';

        if (activeItemIndex + 1 < priceItemsQuantity) {
          priceItems[activeItemIndex + 1].style.left = '100%';
        }
      }
      priceItems[activeItemIndex].classList.add('slider__price-item--active');
      priceItems[activeItemIndex].style.left = '0';
    }

    function activateSlider() {
      for (i = 0; i < priceItemsQuantity; i++) {
        priceItems[i].classList.add('slider__price-item--js');
        if (activeItemIndex > 0) { priceItems[activeItemIndex - 1].style.left = '-100%' };
        if (activeItemIndex + 1 < priceItemsQuantity) { priceItems[activeItemIndex + 1].style.left = '100%' };
      }
      setActiveDot();
    }

    function deactivateSlider() {
      for (i = 0; i < priceItemsQuantity; i++) {
        priceItems[i].classList.remove('slider__price-item--js');
        priceItems[i].style.left = '0';
      }
    }

    function makeDots() {
      var newDot;
      for (i = 0; i < priceItemsQuantity; i++) {
        newDot = document.createElement('span');
        newDot.className = 'slider__button';
        dotsContainer.appendChild(newDot);
      } // create dot for each slide
    }

    function moveOnSwipe() {
      swipeArea.on('swiperight', function(event) {
        moveBackward();
        setActiveDot();
      }, false);
      swipeArea.on('swipeleft', function(event) {
        moveForward();
        setActiveDot();
      }, false);
    }

    function moveOnDotClick() {
      var dots = dotsContainer.querySelectorAll('span'),
          DotList = Array.prototype.slice.call(dots),
          dotsQuantity = dots.length,
          activeDot, activeDotIndex, clickedDotIndex;

      for (i = 0; i < dotsQuantity; i++) {
        dots[i].addEventListener('tap', function(event) {
          for (i = 0; i < priceItemsQuantity; i++) {
            priceItems[i].style.left = '0';
          }

          activeDot = dotsContainer.getElementsByClassName('slider__button--active'); // getting index of active dot
          activeDotIndex = DotList.indexOf(activeDot[0]);
          clickedDotIndex = DotList.indexOf(this); // getting index of clicked dot

          removeMovingClasses();

          if (clickedDotIndex > activeDotIndex) {
            priceItems[activeItemIndex].classList.add('slider__slide--forward-out');
            priceItems[clickedDotIndex].classList.add('slider__slide--forward-in');

            if (clickedDotIndex + 1 < priceItemsQuantity) {
              priceItems[clickedDotIndex + 1].style.left = '100%';
            }
            priceItems[activeItemIndex].style.left = '-100%';
          }

          else if (clickedDotIndex < activeDotIndex) {
            priceItems[activeItemIndex].classList.add('slider__slide--backward-out');
            priceItems[clickedDotIndex].classList.add('slider__slide--backward-in');

            if (clickedDotIndex > 0) {
              priceItems[clickedDotIndex - 1].style.left = '-100%';
            }
            priceItems[activeItemIndex].style.left = '100%';
          }

          activeItemIndex = clickedDotIndex;
          activeDotIndex = clickedDotIndex;
          priceItems[activeItemIndex].classList.add('slider__price-item--active');
          priceItems[activeItemIndex].style.left = '0';
          setActiveDot();

        }, false);
      }
    }
    // end of functions

    makeDots();
    activateSlider();
    moveOnSwipe();
    moveOnDotClick();

    if (window.matchMedia('(min-width: 700px)').matches) {
      deactivateSlider();
    }

    window.addEventListener('resize', function() {
      if (window.innerWidth > prevWidth && (window.matchMedia("(min-width: 700px)").matches)) {
        deactivateSlider();
        prevWidth = window.innerWidth;
      }
      else if (window.innerWidth < prevWidth && (window.matchMedia("(max-width: 700px)").matches)) {
        activateSlider();
        prevWidth = window.innerWidth;
      }
    });
  }

  priceSlider(prices);

})();
