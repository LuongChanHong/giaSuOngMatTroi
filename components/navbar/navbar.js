window.onscroll = function(){stickyNavbar()}

var navbar = document.getElementById("nav-container");
var offsettop = navbar.offsetTop;

function stickyNavbar(){
    if(window.pageYOffset > offsettop){
        navbar.classList.add("boxShadow");
    }else{
        navbar.classList.remove("boxShadow");
    }
}
