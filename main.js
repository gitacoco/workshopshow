var swiper = new Swiper(".swiper-container", {
  //   breakpoints: {
  //     // when window width is >= 320px
  //     600: {
  //       slidesPerView: 2,
  //       spaceBetween: 0,
  //       slidesPerGroup: 2,
  //     },
  //     // when window width is >= 320px
  //     950: {
  //       slidesPerView: 3,
  //       spaceBetween: 0,
  //       slidesPerGroup: 3,
  //     },
  //     // when window width is >= 480px
  //     1300: {
  //       slidesPerView: 4,
  //       spaceBetween: 0,
  //       slidesPerGroup: 4,
  //     },
  //     // when window width is >= 640px
  //     1600: {
  //       slidesPerView: 5,
  //       spaceBetween: 0,
  //       slidesPerGroup: 1,
  //     },
  //   },
  slidesPerView: "auto",
  spaceBetween: 0,
  slidesPerGroup: 1,
  centeredSlides: true,
  centeredSlidesBounds: true,
  direction: "horizontal",
  //   freeMode: true,
  loop: true,
  mousewheel: false,
  preloadImages: true,
  keyboard: true,
  watchSlidesProgress: true,
  watchSlidesVisibility: true,
  // simulateTouch: false,
  // cssMode: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  on: {
    click: function (swiper, e) {
      if (typeof this.clickedIndex !== "undefined") {
        this.slideTo(this.clickedIndex);
      }
    },
    slideChangeTransitionEnd: function () {
      // $(".swiper-slide-active h1").click(function() {
      //     alert( "杀掉你" );
      //   });
      $(".swiper-slide-prev").removeClass("expanded");
      $(".swiper-slide-next").removeClass("expanded");
      $(".swiper-slide-active").addClass("expanded");
    },
  },
});

// $(".swiper-slide-prev").removeClass("expanded");
// $(".swiper-slide-next").removeClass("expanded");
