// pattern
// document
//   .getElementById("filter_subject")
//   .addEventListener("click", function () {
//     console.log("RUN");
//   });
// pattern

// VALIRABLE
let isChecked = false;

// SHOW AND HIDE OPTION LIST - START
function showOptionList(element) {
  if (element.style.display == "none") {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
}
// function showOptionList(id) {
//   if (document.getElementById(id).style.display == "none") {
//     document.getElementById(id).style.display = "block"
//   } else {
//     document.getElementById(id).style.display = "none";
//   }
// }

function hideAllOptionList(className) {
  let filter_selects = document.getElementsByClassName(className);
  for (let i = 0; i < filter_selects.length; i++) {
    let filter_select = filter_selects[i];
    filter_select.style.display = "none";
  }
}
// var subject = document.getElementById("subject_option");
// var certifi = document.getElementById("certifi_option");
// var tutorCareer = document.getElementById("tutorCareer_option");
// var section = document.getElementById("section_option");
// switch (className) {
//   case "subject_option":
//     certifi.style.display = "none";
//     tutorCareer.style.display = "none";
//     section.style.display = "none";
//     break;
//   case "certifi_option":
//     subject.style.display = "none";
//     tutorCareer.style.display = "none";
//     section.style.display = "none";
//     break;
//   case "tutorCareer_option":
//     certifi.style.display = "none";
//     subject.style.display = "none";
//     section.style.display = "none";
//     break;
//   case "section_option":
//     certifi.style.display = "none";
//     tutorCareer.style.display = "none";
//     subject.style.display = "none";
//     break;
//   default:
//     certifi.style.display = "none";
//     tutorCareer.style.display = "none";
//     subject.style.display = "none";
//     section.style.display = "none";
//     break;
// }
//}

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
// function activeElement(seclectId, classNameList, styleClassName) {
//   var classArray = document.getElementsByClassName(classNameList);
//   for (var i = 0; i < classArray.length; i++) {
//     classArray[i].classList.remove(styleClassName);
//   }
//   document.getElementById(seclectId).classList.add(styleClassName);
//   //   console.log("element", seclectedId);
// }
// ACTIVE EFFECT - END

// Turn off outline clicked - start
function turnOffOutline(element) {
  element.classList.replace("activeOutline", "none");
}
// function turnOffOutline(id) {
//   document.getElementById(id).classList.replace("activeOutline", "none");
// }

function turnOffAllOutline() {
  let filter_selects = document.getElementsByClassName("select_item_ctn");
  for (let i = 0; i < filter_selects.length; i++) {
    let filter_select = filter_selects[i];
    turnOffOutline(filter_select);
  }
}
// function turnOffAllOutline() {
//   turnOffOutline("filter_subject");
//   turnOffOutline("filter_certifi");
//   turnOffOutline("filter_tutorCareer");
//   turnOffOutline("filter_section");
// }
// Turn off outline clicked - end

// Handle filter option item click event - start
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
// function subject_option_click(optionID) {
//   activeElement(optionID, "select_item", "activeBg"); //Tô màu option được chọn
//   hideOptionList("subject_option"); //Ẩn đi select
//   document.getElementById("subject_stl").innerHTML =
//     document.getElementById(optionID).innerHTML;  //Bỏ text được chọn vào select title
//   turnOffOutline("filter_subject"); //Bỏ đi outline
// }

// function sertifi_option_click(optionID) {
//   activeElement(optionID, "select_item", "activeBg");
//   hideOptionList("certifi_option");
//   document.getElementById("certifi_stl").innerHTML =
//     document.getElementById(optionID).innerHTML;
//   turnOffOutline("filter_certifi");
// }

// function career_option_click(optionID) {
//   activeElement(optionID, "select_item", "activeBg");
//   hideOptionList("tutorCareer_option");
//   document.getElementById("career_stl").innerHTML =
//     document.getElementById(optionID).innerHTML;
//   turnOffOutline("filter_tutorCareer");
// }

// function section_option_click(optionID) {
//   activeElement(optionID, "select_item", "activeBg");
//   hideOptionList("section_option");
//   document.getElementById("section_stl").innerHTML =
//     document.getElementById(optionID).innerHTML;
//   turnOffOutline("filter_section");
// }
// Handle filter option item click event - end

// EACH FILTER BUTTON HANDELER - START
// Subject button filter - start
let flag = false;
let filter_selects = document.getElementsByClassName("select_item_ctn");
for (let i = 0; i < filter_selects.length; i++) {
  let filter_select = filter_selects[i];
  filter_select.addEventListener("click", function () {
    hideAllOptionList("select_case_ctn");
    showOptionList(filter_select.nextElementSibling);
    activeElement(filter_select, "select_item_ctn", "activeOutline");
  });
}

// document
//   .getElementById("filter_subject")
//   .addEventListener("click", function () {
//     hideAllOptionList("select_case_ctn");
//     showOptionList("subject_option");
//     activeElement("filter_subject", "select_item_ctn", "activeOutline");
//   });
// Options - start
let select_items = document.getElementsByClassName("select_item");
for (let i = 0; i < select_items.length; i++) {
  let select_item = select_items[i];
  select_item.addEventListener("click", function () {
    option_click(select_item);
  });
}
// document.getElementById("subject_all").addEventListener("click", function () {
//   subject_option_click("subject_all");
// });

// document.getElementById("subject_math").addEventListener("click", function () {
//   subject_option_click("subject_math");
// });

// document
//   .getElementById("subject_physic")
//   .addEventListener("click", function () {
//     subject_option_click("subject_physic");
//   });

// document
//   .getElementById("subject_chemis")
//   .addEventListener("click", function () {
//     subject_option_click("subject_chemis");
//   });
// Options - end
// Subject button filter - end

// Sertificate button filter - start
// document
//   .getElementById("filter_certifi")
//   .addEventListener("click", function () {
//     hideAllOptionList("certifi_option");
//     activeElement("filter_certifi", "select_item_ctn", "activeOutline");
//     showOptionList("certifi_option");
//   });
// Options - start
// document.getElementById("certifi_all").addEventListener("click", function () {
//   sertifi_option_click("certifi_all");
// });

// document.getElementById("certifi_1").addEventListener("click", function () {
//   sertifi_option_click("certifi_1");
// });

// document.getElementById("certifi_2").addEventListener("click", function () {
//   sertifi_option_click("certifi_2");
// });

// document.getElementById("certifi_3").addEventListener("click", function () {
//   sertifi_option_click("certifi_3");
// });
// Options - end
// Sertificate button filter - end

// Teacher career button filter - start
// document
//   .getElementById("filter_tutorCareer")
//   .addEventListener("click", function () {
//     hideAllOptionList("tutorCareer_option");
//     activeElement("filter_tutorCareer", "select_item_ctn", "activeOutline");
//     showOptionList("tutorCareer_option");
//   });
// Options - start
// document.getElementById("career_all").addEventListener("click", function () {
//   career_option_click("career_all");
// });

// document.getElementById("career_teach").addEventListener("click", function () {
//   career_option_click("career_teach");
// });

// document.getElementById("career_stud").addEventListener("click", function () {
//   career_option_click("career_stud");
// });

// document.getElementById("career_mast").addEventListener("click", function () {
//   career_option_click("career_mast");
// });
// Options - end
// Teacher career button filter - end

// Section button filter - start
// document
//   .getElementById("filter_section")
//   .addEventListener("click", function () {
//     hideAllOptionList("section_option");
//     activeElement("filter_section", "select_item_ctn", "activeOutline");
//     showOptionList("section_option");
//   });
// Options - start
// document.getElementById("section_1on1").addEventListener("click", function () {
//   section_option_click("section_1on1");
// });

// document.getElementById("section_10on1").addEventListener("click", function () {
//   section_option_click("section_10on1");
// });

// document.getElementById("section_1on10").addEventListener("click", function () {
//   section_option_click("section_1on10");
// });

// document.getElementById("section_10on10").addEventListener("click", function () {
//     section_option_click("section_10on10");
//   });

// Options - end
// Section button filter - end

// Genger check box filter - start
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
// function handle(activeId, iconId) {
//   let value = "";
//   let hasClass = document
//     .getElementById(activeId)
//     .classList.contains("activeBg");
//   let display = document.getElementById(iconId).style.display;
//   if (hasClass == false && display == "none") {
//     document.getElementById(activeId).classList.add("activeBg");
//     document.getElementById(iconId).style.display = "block";
//   } else {
//     document.getElementById(activeId).classList.remove("activeBg");
//     document.getElementById(iconId).style.display = "none";
//   }
// }

let check_boxs = document.getElementsByClassName("check_box");
for (let i = 0; i < check_boxs.length; i++) {
  let check_box = check_boxs[i];
  check_box.addEventListener("click", function () {
    handle(check_box);
    hideAllOptionList("all");
    turnOffAllOutline();
  });
}
// document.getElementById("filter_female").addEventListener("click", function () {
//   handle("filter_female", "female_check_icn");
//   hideAllOptionList("all");
//   turnOffAllOutline();
// });
// document.getElementById("filter_male").addEventListener("click", function () {
//   handle("filter_male", "male_check_icn");
//   hideAllOptionList("all");
//   turnOffAllOutline();
// });

// Gneger check box filter - end
// EACH FILTER BUTTON HANDELER - END
