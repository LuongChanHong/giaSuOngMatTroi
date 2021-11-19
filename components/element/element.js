// pattern
// document
//   .getElementById("filter_subject")
//   .addEventListener("click", function () {
//     console.log("RUN");
//   });
// pattern

// VALIRABLE

// SHOW AND HIDE OPTION LIST - START
function showOptionList(element) {
  if (element.style.display == "none") {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
}
function hideAllOptionList(className) {
  let filter_selects = document.getElementsByClassName(className);
  for (let i = 0; i < filter_selects.length; i++) {
    let filter_select = filter_selects[i];
    filter_select.style.display = "none";
  }
}
function hideOptionList(element) {
  element.style.display = "none";
}
// SHOW AND HIDE OPTION LIST - END

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
function turnOffOutline(element) {
  element.classList.replace("activeOutline", "none");
}
function turnOffAllOutline() {
  let filter_selects = document.getElementsByClassName("select_item_ctn");
  for (let i = 0; i < filter_selects.length; i++) {
    let filter_select = filter_selects[i];
    turnOffOutline(filter_select);
  }
}
// TURN OFF OUTLINE CLICK - END

// FILTER OPTION ITEM CLICK HANDLER - START
function option_click(element) {
  activeElement(element, "select_item", "activeBg"); //Tô màu option được chọn
  let option_list = element.parentElement.parentElement;
  let filter_select =
    option_list.parentElement.getElementsByClassName("select_item_ctn")[0];
  hideOptionList(option_list); //Ẩn đi select
  filter_select.getElementsByClassName("select_option")[0].innerHTML =
    element.innerHTML; //Bỏ text được chọn vào select title
  turnOffOutline(filter_select); //Bỏ đi outline
}
// FILTER OPTION ITEM CLICK HANDLER - END

// INPUT FILTER HANDLER - START
let filter_selects = document.getElementsByClassName("select_item_ctn");
for (let i = 0; i < filter_selects.length; i++) {
  let filter_select = filter_selects[i];
  filter_select.addEventListener("click", function () {
    hideAllOptionList("select_case_ctn");
    showOptionList(filter_select.nextElementSibling);
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
let isAllUnCheck = true;
let isUnCheck = true;

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
    }
    isAllUnCheck = isAllUnCheck && isUnCheck; // general status of 2 check box
  }
  if (isAllUnCheck) {
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
    hideAllOptionList("all");
    turnOffAllOutline();
    autoCheck();
  });
}
// GENGER CHECKBOX FILTER - END
// EACH FILTER BUTTON HANDELER - END
