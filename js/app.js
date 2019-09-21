/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
const navBar = document.getElementById("navbar__list");
const sections = document.querySelectorAll("section[data-nav]");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */


/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
const buildMenu = () => {
  const menuFragment = document.createDocumentFragment();
  for (const section of sections) {
    const menuItem = document.createElement("li");
    const sectionId = section.getAttribute("id");
    menuItem.innerHTML = `
      <a class="menu__link" href="#${sectionId}">
        ${section.dataset.nav}
      </a>
    `;
    menuFragment.appendChild(menuItem);
  }
  navBar.appendChild(menuFragment);
};

// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
buildMenu();

// Scroll to section on link click

// Set sections as active

