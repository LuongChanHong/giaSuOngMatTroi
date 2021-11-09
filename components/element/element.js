// SHOW-AND-HIDE JS
var showAndHideTitles = $(".show-and-hide_content_item_title");
for (let i = 0; i < showAndHideTitles.length; i++) {
    let showAndHideTitle = showAndHideTitles[i]
    let showAndHideContent = showAndHideTitles[i].nextElementSibling;
    let showAndHideContentSpan = showAndHideContent.getElementsByTagName("div")[0];
    let showAndHideIcon = showAndHideTitle.getElementsByTagName("svg")[0];
    
    showAndHideContent.style.height = "0px"

    showAndHideTitle.addEventListener("click", () => {
        showAndHideContent.style.height = showAndHideContent.offsetHeight.toString() + "px";
        var spanHeight = showAndHideContentSpan.offsetHeight;
        if (showAndHideContent.offsetHeight != 0) {
            showAndHideContent.style.height = 0;
            showAndHideIcon.removeAttribute("transform");
        }
        else {
            showAndHideContent.style.height = spanHeight.toString()+"px";
            showAndHideIcon.setAttribute("transform", "rotate(-45)");
        }
    });
}