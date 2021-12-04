// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// TESTING CAROUSEL - START
// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

window.onload = function () {
  // var slides = document.getElementsByClassName("carousel-item"),
  //   addActive = function (slide) {
  //     slide.classList.add("active");
  //   },
  //   removeActive = function (slide) {
  //     slide.classList.remove("active");
  //   };
  // addActive(slides[0]);
  var slides = document.getElementsByClassName("carousel-item");
  function addActive(slide) {
    slide.classList.add("active");
  }
  function removeActive(slide) {
    slide.classList.remove("active");
  }
  addActive(slides[0]);

  setInterval(function () {
    for (var i = 0; i < slides.length; i++) {
      // Đến slide cuối cùng, active slide đầu tiên, unactive slide cuối
      if (i + 1 == slides.length) {
        addActive(slides[0]); // Active slide đầu tiên
        slides[0].style.zIndex = 100; // Đảm bảo slide vừa active ưu tiên hiện,  không bị che
        setTimeout(removeActive(slides[i]), 350); // Unactive silde cuối cùng //Doesn't be worked in IE-9
        break;
      }
      // Khi 1 slide đang active, unactive slide đó, active slide kế tiếp
      if (slides[i].classList.contains("active")) {
        slides[i].removeAttribute("style"); // Unactive slide i
        setTimeout(removeActive(slides[i]), 350); // Unactive slide i lần 2 ??? //Doesn't be worked in IE-9
        addActive(slides[i + 1]); // Active slide kế
        break;
      }
    }
  }, 1000);
};
// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

document.addEventListener(
  "DOMContentLoaded",
  function () {
    var arrowLeft = document.querySelector(".slick-prev");
    var arrowRight = document.querySelector(".slick-next");

    var slickTrack = document.querySelector(".slick-track");
    var slickSlice = document.querySelectorAll(".slick-slide");
    var slickDots = document.querySelectorAll(".slick-dots li");

    var btn = document.querySelectorAll(".slick-dots button");
    var eleIsClicked = 0;

    var size = slickSlice[0].clientWidth;
    var count = 1,
      time = 4000;
    var stateTab = true;
    var stateTranslateOfSlickTrack = true;
    var v_interval = "";

    var hidden, visibilityChange;
    if (typeof document.hidden !== "undefined") {
      hidden = "hidden";
      visibilityChange = "visibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
      hidden = "msHidden";
      visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
      hidden = "webkitHidden";
      visibilityChange = "webkitvisibilitychange";
    }

    function handleVisibilityChange() {
      stateTab = document[hidden] ? false : true;
      if (stateTab) {
        run_setInterval();
      } else {
        run_clearInterval();
      }
    }

    document.addEventListener(visibilityChange, handleVisibilityChange, false);

    // Khi click vào arrow left
    arrowLeft.addEventListener("click", function (e) {
      if (stateTranslateOfSlickTrack) {
        run_clearInterval();
        commonFuncBothArrows(true, false, e);
        run_setInterval();
      }
    });

    // Khi click vào arrow right
    arrowRight.addEventListener("click", function (e) {
      if (stateTranslateOfSlickTrack) {
        run_clearInterval();
        commonFuncBothArrows(false, true, e);
        run_setInterval();
      }
    });

    function commonFuncBothArrows(arrowL, arrowR, e) {
      e.preventDefault();
      stateTranslateOfSlickTrack = false;
      if (arrowL) {
        if (count <= 0) {
          return;
        }
      } else {
        if (arrowR) {
          if (count >= slickSlice.length - 1) {
            return;
          }
        }
      }
      slickDots[count - 1].classList.remove("slick-active");
      slickTrack.style.transition = `transform 0.5s ease-in-out`;
      count = arrowL ? --count : ++count;
      console.log("count - " + count);
      slickTrack.style.transform = `translate3d(${-size * count}px,0px,0px)`;
      eleIsClicked = count - 1;
      switch (count) {
        case 0:
          slickDots[slickDots.length - 1].classList.add("slick-active");
          break;
        case slickSlice.length - 1:
          slickDots[0].classList.add("slick-active");
          break;
        default:
          slickDots[count - 1].classList.add("slick-active");
          break;
      }
    }

    btn.forEach((elem) => {
      elem.addEventListener("click", () => {
        if (stateTranslateOfSlickTrack) {
          run_clearInterval();
          slickTrack.style.transition = `transform 0.5s ease-in-out`;
          count = Number(elem.textContent);
          console.log("eleIsClicked - btn - " + eleIsClicked);
          slickDots[eleIsClicked].classList.remove("slick-active");
          slickDots[count - 1].classList.add("slick-active");
          slickTrack.style.transform = `translate3d(${
            -size * count
          }px,0px,0px)`;
          eleIsClicked = count - 1;
          run_setInterval();
        }
      });
    });

    run_setInterval();
    function run_setInterval() {
      v_interval = setInterval(() => {
        slickDots[count - 1].classList.remove("slick-active");
        slickTrack.style.transition = "transform 0.5s ease-in-out";
        slickTrack.style.transform = `translate3d(${
          -size * ++count
        }px,0px,0px)`;
        console.log("count - " + count);
        eleIsClicked = count - 1;
        if (count === slickSlice.length - 1) {
          slickDots[0].classList.add("slick-active");
        } else {
          slickDots[count - 1].classList.add("slick-active");
        }
      }, time);
    }

    function run_clearInterval() {
      clearInterval(v_interval);
    }

    slickTrack.addEventListener("transitionend", () => {
      stateTranslateOfSlickTrack = true;
      let nameClassSlickSlide = slickSlice[count].id;
      if (
        nameClassSlickSlide === "lastClone" ||
        nameClassSlickSlide === "firstClone"
      ) {
        slickTrack.style.transition = `none`;
        count =
          nameClassSlickSlide === "lastClone"
            ? slickSlice.length - 2
            : nameClassSlickSlide === "firstClone"
            ? 1
            : count;
        eleIsClicked = count - 1;
        slickTrack.style.transform = `translateX(-${size * count}px)`;
      }
    });
  },
  false
);
// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// TESTING CAROUSEL - END
// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
