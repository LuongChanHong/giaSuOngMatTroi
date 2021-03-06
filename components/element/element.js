// pattern
// document
//   .getElementById("filter_subject")
//   .addEventListener("click", function () {
//     console.log("RUN");
//   });
// pattern

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

// IELTS TUTOR PAGE CONTENT TABLE - START

const contentsTable_btn =
  document.getElementsByClassName("contentsTable_btn")[0];
const contentsTable_ctt =
  document.getElementsByClassName("contentsTable_ctt")[0];
contentsTable_btn.addEventListener("click", () => {
  if (contentsTable_ctt.style.display == "block") {
    contentsTable_ctt.style.display = "none";
    contentsTable_ctt.style.height = 0;
  } else {
    contentsTable_ctt.style.display = "block";
    contentsTable_ctt.style.height = "fit-content";
  }
});

// IELTS TUTOR PAGE CONTENT TABLE - END

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
  activeElement(element, "select_item", "activeBg"); //T?? m??u option ???????c ch???n
  let option_list = element.parentElement.parentElement;
  let filter_select =
    option_list.parentElement.getElementsByClassName("select_item_ctn")[0];
  hideElement(option_list); //???n ??i select
  filter_select.getElementsByClassName("select_option")[0].innerHTML =
    element.innerHTML; //B??? text ???????c ch???n v??o select title
  turnUnactive(filter_select); //B??? ??i outline
  isOptionListShow = false; // ????nh d???u option list ???? ????ng
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
// N???u profile menu ??ang m??? b??? thay ?????i chi???u d??i m??n h??nh th?? option list t??? ???n
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
  // M???c ?????nh ch??? hi???n 2 comment ?????u ti??n, c??n l???i ???n
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

// IELTS TUTOR PAGE RADIO BUTTON HANDLER - START
// let ielstTutorRadioButtons = document.getElementsByClassName(
//   "tutor_list_radio_btn"
// );

// let button = document.getElementsByClassName("list_form_btn")[0];
// button.addEventListener("click", () => {
//   for (let i = 0; i < ielstTutorRadioButtons.length; i++) {
//     let ielstTutorRadioButton = ielstTutorRadioButtons[i];
//     if (ielstTutorRadioButton.checked) {
//       console.log("IF RUN");
//       console.log("value:", ielstTutorRadioButton.value);
//     }
//     console.log("FOR RUN");
//   }
//   console.log("RUN");
// });
const _button = document.getElementsByClassName("list_btn")[0];
_button.addEventListener("click", () => {
  console.log("RUN");
});

// IELTS TUTOR PAGE RADIO BUTTON HANDLER - END

// IELTS TUTOR PAGE SMOOTH SCROLL - START
// Grab all the scroll class anchor elements, use whatever class you like
const scrollElems = document.querySelectorAll(".scroll");
// Now add an event listeners to those element
for (let i = 0; i < scrollElems.length; i++) {
  const elem = scrollElems[i];

  elem.addEventListener("click", function (e) {
    e.preventDefault();

    // 1. Get the element id to which you want to scroll
    const scrollElemId = e.target.href.split("#")[1];

    // 2. find that node from the document
    const scrollEndElem = document.getElementById(scrollElemId);

    // 3. and well animate to that node..
    const anim = requestAnimationFrame((timestamp) => {
      const stamp = timestamp || new Date().getTime();
      const duration = 1200;
      const start = stamp;

      const startScrollOffset = window.pageYOffset;
      const scrollEndElemTop = scrollEndElem.getBoundingClientRect().top;

      scrollToElem(start, stamp, duration, scrollEndElemTop, startScrollOffset);
    });
  });
}

// IELTS TUTOR PAGE SMOOTH SCROLL - END
