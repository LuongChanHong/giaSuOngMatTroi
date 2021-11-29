// pattern
// document
//   .getElementById("filter_subject")
//   .addEventListener("click", function () {
//     console.log("RUN");
//   });
// pattern

// TESTING CAROUSEL - START
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
// TESTING CAROUSEL - END

// VALIRABLE
let isOptionListShow = false;
// SHOW AND HIDE ELEMENT - START
function showElement(element) {
  element.style.display = "block";
}
function hideElement(element) {
  element.style.display = "none";
}
function showAndHideSwitch(element, classOrId) {
  switch (classOrId) {
    case "class":
      let domClass = document.getElementsByClassName(element)[0];
      let classDisplay = domClass.style.display;
      if (classDisplay == "none") {
        showElement(domClass);
      } else {
        hideElement(domClass);
      }
      break;
    case "id":
      let domId = document.getElementById(element);
      let idDisplay = domId.style.display;
      if (idDisplay == "none") {
        showElement(domId);
      } else {
        hideElement(domId);
      }
      break;
    default:
      console.log("showAndHideSwitch function error::classOrId param error");
      break;
  }
}
function hideAllOptionList(className) {
  let filter_selects = document.getElementsByClassName(className);
  for (let i = 0; i < filter_selects.length; i++) {
    let filter_select = filter_selects[i];
    filter_select.style.display = "none";
  }
}

// SHOW AND HIDE ELEMENT - END

// ACTIVE EFFECT - START
function activeElement(element, classNameList, styleClassName) {
  var classArray = document.getElementsByClassName(classNameList);
  for (var i = 0; i < classArray.length; i++) {
    classArray[i].classList.remove(styleClassName);
  }
  element.classList.add(styleClassName);
  //   console.log("element", seclectedId);
}
// ACTIVE EFFECT - END

// TURN OFF OUTLINE CLICK - START
function turnUnactive(element) {
  element.classList.replace("activeFilter", "none");
}
function turnAllUnactive() {
  let filter_selects = document.getElementsByClassName("select_item_ctn");
  for (let i = 0; i < filter_selects.length; i++) {
    let filter_select = filter_selects[i];
    turnUnactive(filter_select);
  }
}
// TURN OFF OUTLINE CLICK - END

// FILTER OPTION ITEM CLICK HANDLER - START
function option_click(element) {
  activeElement(element, "select_item", "activeBg"); //Tô màu option được chọn
  let option_list = element.parentElement.parentElement;
  let filter_select =
    option_list.parentElement.getElementsByClassName("select_item_ctn")[0];
  hideElement(option_list); //Ẩn đi select
  filter_select.getElementsByClassName("select_option")[0].innerHTML =
    element.innerHTML; //Bỏ text được chọn vào select title
  turnUnactive(filter_select); //Bỏ đi outline
  isOptionListShow = false; // Đánh dấu option list đã đóng
}
// FILTER OPTION ITEM CLICK HANDLER - END

// INPUT FILTER HANDLER - START
let filter_selects = document.getElementsByClassName("select_item_ctn");
for (let i = 0; i < filter_selects.length; i++) {
  let filter_select = filter_selects[i];
  filter_select.addEventListener("click", function () {
    hideAllOptionList("select_case_ctn");
    if (!isOptionListShow) {
      showElement(filter_select.nextElementSibling);
      isOptionListShow = true;
      // console.log("isOptionListShow =>", isOptionListShow);
    } else {
      hideElement(filter_select.nextElementSibling);
      isOptionListShow = false;
      // console.log("isOptionListShow =>", isOptionListShow);
    }
    activeElement(filter_select, "select_item_ctn", "activeFilter");
  });
}
let select_items = document.getElementsByClassName("select_item");
for (let i = 0; i < select_items.length; i++) {
  let select_item = select_items[i];
  select_item.addEventListener("click", function () {
    option_click(select_item);
  });
}
// INPUT FILTER HANDLER - START

// GENGER CHECKBOX FILTER - START
let check_boxs = document.getElementsByClassName("check_box");
let isAllUnCheck = false;
let isUnCheck = "";

function handle(element) {
  let tick_icon = element.getElementsByTagName("svg")[0];
  let hasClass = element.classList.contains("activeBg");
  let display = tick_icon.style.display;
  if (hasClass == false && display == "none") {
    element.classList.add("activeBg");
    tick_icon.style.display = "block";
  } else {
    element.classList.remove("activeBg");
    tick_icon.style.display = "none";
  }
}
// If all 2 genger check box unchecked, autoCheck() will check them all
function autoCheck() {
  for (let i = 0; i < check_boxs.length; i++) {
    let check_box = check_boxs[i];
    let isHide = check_box.getElementsByTagName("svg")[0].style.display;
    if (isHide == "block") {
      isUnCheck = false;
    } else {
      isUnCheck = true;
    }
    isAllUnCheck = isAllUnCheck && isUnCheck; // general status of 2 check box
  }
  if (isAllUnCheck == true) {
    // check all when all of them unchecked
    setTimeout(function () {
      for (let i = 0; i < check_boxs.length; i++) {
        check_boxs[i].getElementsByTagName("svg")[0].style.display = "block";
        check_boxs[i].classList.add("activeBg");
      }
    }, 500);
  }
  isAllUnCheck = true;
  isUnCheck = true;
}
for (let i = 0; i < check_boxs.length; i++) {
  let check_box = check_boxs[i];
  check_box.addEventListener("click", function () {
    handle(check_box);
    hideAllOptionList("select_case_ctn");
    turnAllUnactive();
    autoCheck();
  });
}
// GENGER CHECKBOX FILTER - END
// EACH FILTER BUTTON HANDELER - END

// UNACTIVE ALL FILTER WHEN CLICK OUTSIDE - START
document.addEventListener("click", function (evt) {
  var filterItem = document.getElementsByClassName("filter")[0],
    targetElement = evt.target;
  do {
    if (targetElement == filterItem) {
      // console.log("click inside");
      return;
    }
    // Go up the DOM
    targetElement = targetElement.parentNode;
  } while (targetElement);
  // console.log("click outside");
  hideAllOptionList("select_case_ctn");
  turnAllUnactive();
});
// UNACTIVE ALL FILTER WHEN CLICK OUTSIDE - END

// TUTOR PROFILE HEADER HIDE/ SHOW MENU - START
const profileShowMoreBtn = document.getElementsByClassName("m_menu_btn")[0];
const headMenuOption = document.getElementsByClassName("m_menu_option")[0];
profileShowMoreBtn.addEventListener("click", () =>
  showAndHideSwitch("m_menu_option", "class")
);
// Nếu profile menu đang mở bị thay đổi chiều dài màn hình thì option list tự ẩn
const profileHeadMenu = document.getElementById("mobile_menu_items");
const headMenuDisplay = profileHeadMenu.style.display;
if (headMenuDisplay == "none") {
  hideElement(headMenuOption);
}
// TUTOR PROFILE HEADER HIDE/ SHOW MENU - END

// TUTOR PROFILE MENU ITEM HANDLER - START
const headMenuItems = document.getElementsByClassName("menu_option_item");
for (let i = 0; i < headMenuItems.length; i++) {
  let headMenuItem = headMenuItems[i];
  headMenuItem.addEventListener("click", () => {
    hideElement(headMenuOption);
  });
}
// TUTOR PROFILE MENU ITEM HANDLER - END

// TUTOR PROFILE SHOW MORE REVIEW HANDLER - START
// const showMoreBtn = document.getElementsByClassName("show_more_reviews")[0];
const moreReviewTxt = document.getElementsByClassName("more_review")[0];
const moreReviewIcon = document.getElementsByClassName("more_review_icn")[0];
const fewerReviewTxt = document.getElementsByClassName("fewer_review")[0];
const fewerReviewIcon = document.getElementsByClassName("fewer_review_icn")[0];
const reviewCards = document.getElementsByClassName("r_review_card");
hideElement(fewerReviewTxt);
for (let i = reviewCards.length - 3; i >= 0; i--) {
  // Mặc định chỉ hiện 2 comment đầu tiên, còn lại ẩn
  let reviewCard = reviewCards[i];
  hideElement(reviewCard);
}
moreReviewTxt.addEventListener("click", () => {
  for (let i = 0; i < reviewCards.length; i++) {
    let reviewCard = reviewCards[i];
    showElement(reviewCard);
  }
  fewerReviewTxt.style.display = "flex";
  hideElement(moreReviewTxt);
});
fewerReviewTxt.addEventListener("click", () => {
  for (let i = reviewCards.length - 3; i >= 0; i--) {
    let reviewCard = reviewCards[i];
    hideElement(reviewCard);
  }
  moreReviewTxt.style.display = "flex";
  hideElement(fewerReviewTxt);
});
// TUTOR PROFILE SHOW MORE REVIEW HANDLER - END
