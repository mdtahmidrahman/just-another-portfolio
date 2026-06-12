// Toggle menu
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

if (menuIcon) {
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('fa-xmark');
        menuIcon.classList.toggle('fa-bars');
        navbar.classList.toggle('active');
    };
}

// Remove menu icon on scroll
window.onscroll = () => {
    if (menuIcon && navbar) {
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
        navbar.classList.remove('active');
    }
};

// Show more projects
let showMoreBtn = document.getElementById('showMoreBtn');
let portfolioExtraContainer = document.getElementById('portfolioExtraContainer');

if (showMoreBtn && portfolioExtraContainer) {
    showMoreBtn.onclick = () => {
        portfolioExtraContainer.classList.toggle('expanded');
        showMoreBtn.classList.toggle('expanded');
    };
}

// Typing Animation
var typed = new Typed('.typing', {
    strings: ["Software Engineer", "Android App Developer", "Web Developer", "AI & ML Enthusiast"],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 1500,
    loop: true,
    contentType: 'text'
});
