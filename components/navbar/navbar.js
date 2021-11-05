window.onscroll = function(){stickyNavbar()}

var navbar = document.getElementById("nav-container");
var offsettop = navbar.offsetTop;

function stickyNavbar(){
    if(window.pageYOffset > offsettop){
        navbar.classList.add("sticky");
    }else{
        navbar.classList.remove("sticky");
    }
}
