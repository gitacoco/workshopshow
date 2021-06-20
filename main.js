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
  initialSlide: 2,
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
      if (typeof this.clickedIndex !== "undefined" && this.clickedIndex !== this.activeIndex && !pulled) {
        this.slideTo(this.clickedIndex);
        setTimeout(() => {
          pull();
        }, 500);
      }
    },
    slideChangeTransitionStart: function() {
      $(".swiper-slide-active").removeClass('enable-pull');
    },
    slideChangeTransitionEnd: function() {
      $(".swiper-slide-active").addClass('enable-pull');
    },
  },
});

$(window).on('hashchange', () => {
  $('video')[0].pause();
});

let intervalId = null;
let pulled = false;
const showTitleForGroup = () => {
  if (intervalId !== null) { return; }
  intervalId = setInterval(() => {
    const groupId = $(".swiper-slide-active").prev().prev().attr('data-group');
    $(`.title img`).hide();
    $(`.title img.group${groupId}-title`).show();
    const prevGroupId = $(".swiper-slide-active").prev().prev().prev().attr('data-group');
  
    if (groupId !== prevGroupId) {
      $(".swiper-slide-active").prev().prev().find('.titleImage').hide();
    } else {
      $(".swiper-slide").prev().prev().find('.titleImage').show();
    }
  }, 8);
}
const showTitleForActive = () => {
  clearInterval(intervalId);
  intervalId = null;

  const groupId = $(".swiper-slide-active").attr('data-group');
  $(`.title img`).hide();
  $(`.title img.group${groupId}-title`).show();
  $(".swiper-slide-active").find('.titleImage').hide();
};
const pull = () => {
  const width = document.documentElement.clientWidth / 5;
  $('.swiper-slide-active').css({
    'z-index': 5,
  });
  $('.swiper-slide-active').find('.swiper-slide-container').addClass('active');
  $('.swiper-slide-active').find('.swiper-slide-container').css({
    transform: `translateX(-${width * 1.5}px)`,
  });
  $('.swiper-slide-active').next().find('.swiper-slide-container').addClass('next');
  $('.swiper-slide-active').next().next().find('.swiper-slide-container').addClass('next');
  $('.swiper-slide-active').prev().find('.swiper-slide-container').addClass('prev');
  $('.swiper-slide-active').prev().prev().find('.swiper-slide-container').addClass('prev');
  showTitleForActive();
  $('.swiper-slide-active').find('.pulled-content').show();
  $('#control').fadeOut();
  $('.swiper-slide').addClass('swiper-no-swiping');
  swiper.simulateTouch = false;
  swiper.update();
  pulled = true;
};
const clearPull = () => {
  $('.swiper-slide-active').find('.swiper-slide-container').removeClass('active');
  $('.swiper-slide-active').css({
    'z-index': 1,
  });
  $('.swiper-slide-active').find('.swiper-slide-container').css({
    transform: `translateX(0px)`,
  });
  $('.swiper-slide-active').next().find('.swiper-slide-container').removeClass('next');
  $('.swiper-slide-active').next().next().find('.swiper-slide-container').removeClass('next');
  $('.swiper-slide-active').prev().find('.swiper-slide-container').removeClass('prev');
  $('.swiper-slide-active').prev().prev().find('.swiper-slide-container').removeClass('prev');
  showTitleForGroup();
  $('#control').fadeIn();
  $('.swiper-slide').removeClass('swiper-no-swiping');
  swiper.simulateTouch = true;
  swiper.update();
  pulled = false;
};

$('body').on('click', '.swiper-slide-active.enable-pull h1', function() {
  pull()
});

$('body').on('click', '.back', (e) => {
  e.preventDefault();
  clearPull();
});

showTitleForGroup();
