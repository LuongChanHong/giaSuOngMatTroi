// pattern
// document
//   .getElementById("filter_subject")
//   .addEventListener("click", function () {
//     console.log("RUN");
//   });
// pattern

// VALIRABLE

// SHOW AND HIDE OPTION LIST - START
function showOptionList(id) {
  if (document.getElementById(id).style.display == "none") {
    document.getElementById(id).style.display = "block";
  } else {
    document.getElementById(id).style.display = "none";
  }
}

function hideAllOptionList(showId) {
  var subject = document.getElementById("subject_option");
  var certifi = document.getElementById("certifi_option");
  var tutorCareer = document.getElementById("tutorCareer_option");
  var section = document.getElementById("section_option");
  switch (showId) {
    case "subject_option":
      certifi.style.display = "none";
      tutorCareer.style.display = "none";
      section.style.display = "none";
      break;
    case "certifi_option":
      subject.style.display = "none";
      tutorCareer.style.display = "none";
      section.style.display = "none";
      break;
    case "tutorCareer_option":
      certifi.style.display = "none";
      subject.style.display = "none";
      section.style.display = "none";
      break;
    case "section_option":
      certifi.style.display = "none";
      tutorCareer.style.display = "none";
      subject.style.display = "none";
      break;
    default:
      certifi.style.display = "none";
      tutorCareer.style.display = "none";
      subject.style.display = "none";
      section.style.display = "none";
      break;
  }
}

function hideOptionList(id) {
  document.getElementById(id).style.display = "none";
}
// SHOW AND HIDE OPTION LIST - END

// ACTIVE EFFECT - START
function activeElement(seclectId, classNameList, styleClassName) {
  var classArray = document.getElementsByClassName(classNameList);
  for (var i = 0; i < classArray.length; i++) {
    classArray[i].classList.remove(styleClassName);
  }
  document.getElementById(seclectId).classList.add(styleClassName);
  //   console.log("element", seclectedId);
}
// ACTIVE EFFECT - END

// Handle filter option item click event - start
function subject_option_click(optionID) {
  activeElement(optionID, "select_item", "activeBg");
  hideOptionList("subject_option");
  document.getElementById("subject_stl").innerHTML =
    document.getElementById(optionID).innerHTML;
}

function sertifi_option_click(optionID) {
  activeElement(optionID, "select_item", "activeBg");
  hideOptionList("certifi_option");
  document.getElementById("certifi_stl").innerHTML =
    document.getElementById(optionID).innerHTML;
}

function career_option_click(optionID) {
  activeElement(optionID, "select_item", "activeBg");
  hideOptionList("tutorCareer_option");
  document.getElementById("career_stl").innerHTML =
    document.getElementById(optionID).innerHTML;
}

function section_option_click(optionID) {
  activeElement(optionID, "select_item", "activeBg");
  hideOptionList("section_option");
  document.getElementById("section_stl").innerHTML =
    document.getElementById(optionID).innerHTML;
}
// Handle filter option item click event - end

// EACH FILTER BUTTON HANDELER - START
// Subject button filter - start
document
  .getElementById("filter_subject")
  .addEventListener("click", function () {
    hideAllOptionList("subject_option");
    showOptionList("subject_option");
    activeElement("filter_subject", "select_item_ctn", "activeOutline");
  });
// Options - start
document.getElementById("subject_all").addEventListener("click", function () {
  subject_option_click("subject_all");
});

document.getElementById("subject_math").addEventListener("click", function () {
  subject_option_click("subject_math");
});

document
  .getElementById("subject_physic")
  .addEventListener("click", function () {
    subject_option_click("subject_physic");
  });

document
  .getElementById("subject_chemis")
  .addEventListener("click", function () {
    subject_option_click("subject_chemis");
  });
// Options - end
// Subject button filter - end

// Sertificate button filter - start
document
  .getElementById("filter_certifi")
  .addEventListener("click", function () {
    hideAllOptionList("certifi_option");
    activeElement("filter_certifi", "select_item_ctn", "activeOutline");
    showOptionList("certifi_option");
  });
// Options - start
document.getElementById("certifi_all").addEventListener("click", function () {
  sertifi_option_click("certifi_all");
});

document.getElementById("certifi_1").addEventListener("click", function () {
  sertifi_option_click("certifi_1");
});

document.getElementById("certifi_2").addEventListener("click", function () {
  sertifi_option_click("certifi_2");
});

document.getElementById("certifi_3").addEventListener("click", function () {
  sertifi_option_click("certifi_3");
});
// Options - end
// Sertificate button filter - end

// Teacher career button filter - start
document
  .getElementById("filter_tutorCareer")
  .addEventListener("click", function () {
    hideAllOptionList("tutorCareer_option");
    activeElement("filter_tutorCareer", "select_item_ctn", "activeOutline");
    showOptionList("tutorCareer_option");
  });
// Options - start
document.getElementById("career_all").addEventListener("click", function () {
  career_option_click("career_all");
});

document.getElementById("career_teach").addEventListener("click", function () {
  career_option_click("career_teach");
});

document.getElementById("career_stud").addEventListener("click", function () {
  career_option_click("career_stud");
});

document.getElementById("career_mast").addEventListener("click", function () {
  career_option_click("career_mast");
});
// Options - end
// Teacher career button filter - end

// Section button filter - start
document
  .getElementById("filter_section")
  .addEventListener("click", function () {
    hideAllOptionList("section_option");
    activeElement("filter_section", "select_item_ctn", "activeOutline");
    showOptionList("section_option");
  });
// Options - start
document.getElementById("section_1on1").addEventListener("click", function () {
  section_option_click("section_1on1");
});

document.getElementById("section_10on1").addEventListener("click", function () {
  section_option_click("section_10on1");
});

document.getElementById("section_1on10").addEventListener("click", function () {
  section_option_click("section_1on10");
});

// Options - end
// Section button filter - end
// EACH FILTER BUTTON HANDELER - END
