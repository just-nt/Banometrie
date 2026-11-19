// Opens and closes the hamburger menu on small screens.

const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const isNowOpen = navLinks.classList.toggle("is-open");

    // Screen readers use aria-expanded to announce whether the menu is open.
    menuButton.setAttribute("aria-expanded", String(isNowOpen));
  });
}
