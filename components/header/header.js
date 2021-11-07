window.onscroll = function(){stickyNavbar()}

var navbar = document.getElementById("nav_ctn");
var offsettop = navbar.offsetTop;

function stickyNavbar(){
    if(window.pageYOffset > offsettop){
        navbar.classList.add("boxShadow");
    }else{
        navbar.classList.remove("boxShadow");
    }
}
