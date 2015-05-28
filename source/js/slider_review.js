// Review slider script
(function() {

  var reviews = document.querySelector('.review');

  function reviewSlider(container) {
    var buttonPrev = container.querySelector('.slider__review-toggle--prev'),
        buttonNext = container.querySelector('.slider__review-toggle--next'),
        slides = container.querySelectorAll('.slider__slide'),
        slidesQuantity = slides.length,
        dotsContainer = container.querySelector('.slider__toggle'),
        SlideList, activeSlide, activeSlideIndex, speed, i, swipeArea, newDot, allDots, DotList;

    slides[0].classList.add('slider__slide--active');

    SlideList = Array.prototype.slice.call(slides);
    activeSlide = container.getElementsByClassName('slider__slide--active');
    activeSlideIndex = SlideList.indexOf(activeSlide[0]);
    swipeArea = new Hammer(container);
    speed = 5000;

    function removeMovingClasses() {
      for (i = 0; i < slides.length; i++) {
        slides[i].classList.remove('slider__slide--forward-out');
        slides[i].classList.remove('slider__slide--forward-in');
        slides[i].classList.remove('slider__slide--backward-out');
        slides[i].classList.remove('slider__slide--backward-in');
        slides[i].classList.remove('slider__slide--active');
      } // one by one class removal is used for IE support
    }

    function moveForward() {
      removeMovingClasses();
      if (activeSlideIndex >= (slidesQuantity - 1)) {
        slides[0].classList.add('slider__slide--forward-in');
        slides[slidesQuantity - 1].classList.add('slider__slide--forward-out');
        activeSlideIndex = 0;
      }
      else {
        activeSlideIndex = activeSlideIndex + 1;
        slides[activeSlideIndex].classList.add('slider__slide--forward-in');
        slides[activeSlideIndex - 1].classList.add('slider__slide--forward-out');
      }
      slides[activeSlideIndex].classList.add('slider__slide--active');
    }

    function moveBackward() {
      removeMovingClasses();
      if (activeSlideIndex <= 0) {
        activeSlideIndex = activeSlideIndex + (slidesQuantity - 1);
        slides[0].classList.add('slider__slide--backward-out');
      }
      else {
        slides[activeSlideIndex].classList.add('slider__slide--backward-out');
        activeSlideIndex = activeSlideIndex - 1;
      }
      slides[activeSlideIndex].classList.add('slider__slide--active');
      slides[activeSlideIndex].classList.add('slider__slide--backward-in');
      // one by one class adding is used for IE support
    }

    function setActiveDot() {
      var dotsQuantity = dotsContainer.querySelectorAll('span').length,
          activeSlide = container.getElementsByClassName('slider__slide--active'),
          activeSlideIndex = SlideList.indexOf(activeSlide[0]);
      for (i = 0; i < dotsQuantity; i++) {
        allDots[i].classList.remove('slider__button--active');
      }
      allDots[activeSlideIndex].classList.add('slider__button--active');
    }

    function autoCycle() {
      var autoForward = window.setInterval(moveForward, speed);

      window.setInterval(setActiveDot, speed);
      swipeArea.on('swipe', function(event) {
        clearInterval(autoForward);
      }, false); // stop autoCycle on mobile devices

      container.addEventListener('mouseover', function() {
        clearInterval(autoForward);
      }, false); // pause autoCycle on hover
      container.addEventListener('mouseout', function() {
        autoForward = window.setInterval(moveForward, speed);
        window.setInterval(setActiveDot, speed);
      }, false); // restart autoCycle
    }
    // end of functions

    buttonPrev.classList.add('slider__review-toggle--prev--visible');
    buttonNext.classList.add('slider__review-toggle--next--visible');

    for (i = 0; i < slidesQuantity; i++) {
      slides[i].classList.add('slider__slide--js');
      newDot = document.createElement('span');
      newDot.className = 'slider__button';
      dotsContainer.appendChild(newDot);
    } // create dot for each slide

    allDots = dotsContainer.querySelectorAll('span');
    DotList = Array.prototype.slice.call(allDots);
    setActiveDot(); // set initial active dot
    autoCycle(); // launch slides autocycle

    buttonNext.addEventListener('tap', function() {
      removeMovingClasses();
      moveForward();
      setActiveDot();
    }, false);

    buttonPrev.addEventListener('tap', function() {
      removeMovingClasses();
      moveBackward();
      setActiveDot();
    }, false);

    // dots navigation
    for (i = 0; i < allDots.length; i++) {
      allDots[i].addEventListener('tap', function(event) {
        var activeDot = dotsContainer.getElementsByClassName('slider__button--active'), // getting index of active dot
            activeDotIndex = DotList.indexOf(activeDot[0]),
            clickedDotIndex = DotList.indexOf(this); // getting index of clicked dot

        removeMovingClasses();
        if (clickedDotIndex > activeDotIndex) {
          slides[activeSlideIndex].classList.add('slider__slide--forward-out');
          slides[clickedDotIndex].classList.add('slider__slide--forward-in');
        }
        else if (clickedDotIndex < activeDotIndex) {
          slides[activeSlideIndex].classList.add('slider__slide--backward-out');
          slides[clickedDotIndex].classList.add('slider__slide--backward-in');
        }

        activeSlideIndex = clickedDotIndex;
        activeDotIndex = clickedDotIndex;
        slides[activeSlideIndex].classList.add('slider__slide--active');
        setActiveDot();
      }, false);
    }

    swipeArea.on('swiperight', function(event) {
      moveBackward();
      setActiveDot();
    }, false);
    swipeArea.on('swipeleft', function(event) {
      moveForward();
      setActiveDot();
    }, false);
  }

  reviewSlider(reviews);

})();
