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
let menuItems = null;
/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * Return index of minimum positive top bounding value from all top bounding section values
 *
 * @param {Array} sectionsArray - Array with all sections participating to calculations
 * @return {Number} representing index of minimum positive top bounding value from all sections top bounding values
 */
const getIndexOfMinPositiveBounding = (sectionsArray) => {
  // create a "bounding values" array representing top bounding values for all our sections
  const boundingArray = sectionsArray.map( section => {
    return section.getBoundingClientRect().top;
  });

  // find the minimum positive bounding value
  const minBounding = boundingArray.reduce((acc, item) => item < acc && item > 0 ? item : acc, Number.MAX_SAFE_INTEGER);

  // return index of minimum positive bounding to know which menu item we should make active
  return boundingArray.findIndex(item => item === minBounding);
};

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

  // we store menu items for using it inside makeSectionActive function
  menuItems = document.querySelectorAll("a.menu__link");
};

// Add class "active" to section when near top of viewport
const activateMenuForMostVisibleSection = () => {
  const indexOfMinBounding = getIndexOfMinPositiveBounding([...sections]);

  // knowing index of minimum positive bounding value we are able to decide which menu item to activate
  [...menuItems].map((menu, index) => {
    if (index === indexOfMinBounding) {
      menu.classList.add("active");
    } else {
      menu.classList.remove("active");
    }
  })
};

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
document.addEventListener("scroll", activateMenuForMostVisibleSection);
