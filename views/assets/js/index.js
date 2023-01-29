let mobileNav = document.getElementById("mobile-nav");
let closeBTN = document.getElementById("close-mobile-nav");
let hamburgerBTN = document.getElementById("hamburger-menu");
closeBTN.addEventListener("click", () => {
  mobileNav.classList.toggle("hidden");
});
hamburgerBTN.addEventListener("click", () => {
  mobileNav.classList.toggle("hidden");
});