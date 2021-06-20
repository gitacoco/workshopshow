var swiper = new Swiper(".swiper-container", {
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
      if (typeof this.clickedIndex !== "undefined" && !pulled) {
        this.slideTo(this.clickedIndex);
      }
    },
  },
});

$(window).on("hashchange", () => {
  $("video")[0].pause();
});

let intervalId = null;
let pulled = false;
const showTitleForGroup = () => {
  if (intervalId !== null) {
    return;
  }
  intervalId = setInterval(() => {
    const groupId = $(".swiper-slide-active").prev().prev().attr("data-group");
    $(`.title img`).hide();
    $(`.title img.group${groupId}-title`).show();
    const prevGroupId = $(".swiper-slide-active")
      .prev()
      .prev()
      .prev()
      .attr("data-group");

    if (groupId !== prevGroupId) {
      $(".swiper-slide-active").prev().prev().find(".titleImage").hide();
    } else {
      $(".swiper-slide").prev().prev().find(".titleImage").show();
    }
  }, 8);
};
const showTitleForActive = () => {
  clearInterval(intervalId);
  intervalId = null;

  const groupId = $(".swiper-slide-active").attr("data-group");
  $(`.title img`).hide();
  $(`.title img.group${groupId}-title`).show();
  $(".swiper-slide-active").find(".titleImage").hide();
};
const pull = () => {
  const width = document.documentElement.clientWidth / 5;
  $(".swiper-slide-active").css({
    "z-index": 5,
  });
  $(".swiper-slide-active").find(".swiper-slide-container").addClass("active");
  $(".swiper-slide-active")
    .find(".swiper-slide-container")
    .css({
      transform: `translateX(-${width * 1.5}px)`,
    });
  $(".swiper-slide-active")
    .next()
    .find(".swiper-slide-container")
    .addClass("next");
  $(".swiper-slide-active")
    .next()
    .next()
    .find(".swiper-slide-container")
    .addClass("next");
  $(".swiper-slide-active")
    .prev()
    .find(".swiper-slide-container")
    .addClass("prev");
  $(".swiper-slide-active")
    .prev()
    .prev()
    .find(".swiper-slide-container")
    .addClass("prev");
  showTitleForActive();
  $("#control").fadeOut();
  $(".swiper-slide").addClass("swiper-no-swiping");
  pulled = true;
  setTimeout(() => {
    $(".swiper-slide-active").find(".pulled-content").fadeIn();
  }, 390);
//   $(".swiper-slide-active").find(".pulled-content").fadeIn();
};
const clearPull = () => {
  $(".swiper-slide-active video")[0].pause();
  $(".swiper-slide-active")
    .find(".swiper-slide-container")
    .removeClass("active");
  $(".swiper-slide-active").css({
    "z-index": 1,
  });
  $(".swiper-slide-active").find(".swiper-slide-container").css({
    transform: `translateX(0px)`,
  });
  $(".swiper-slide-active")
    .next()
    .find(".swiper-slide-container")
    .removeClass("next");
  $(".swiper-slide-active")
    .next()
    .next()
    .find(".swiper-slide-container")
    .removeClass("next");
  $(".swiper-slide-active")
    .prev()
    .find(".swiper-slide-container")
    .removeClass("prev");
  $(".swiper-slide-active")
    .prev()
    .prev()
    .find(".swiper-slide-container")
    .removeClass("prev");
  showTitleForGroup();
  $("#control").fadeIn();
  $(".swiper-slide").removeClass("swiper-no-swiping");
  pulled = false;
  $(".swiper-slide-active").find(".pulled-content").hide();
};

$("body").on("click", ".swiper-slide-active h1,h2,img", function () {
  pull();
});

$("body").on("click", ".back", (e) => {
  e.preventDefault();
  clearPull();
});

showTitleForGroup();