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
const header = document.getElementsByClassName("page__header")[0];
const navBar = document.getElementById("navbar__list");
const sections = document.querySelectorAll("section[data-nav]");
let menuItems = null;
let isScrollingOn = false;

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
 * Checks to see if an event target is a our element or if it's a parent or ancestor to this one
 *
 * @param {Object} element - Element for whom we do the checking.
 * @param {EventTarget} target - Event target that we want to check.
 * @return {boolean} true if event target is same as element or a parent/ancestor for this one, false otherwise
 */
const checkElementGenetics = (element, node) => {
  while (node.parentNode) {
    if (node === element) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
};

/**
 * Return index of clicked menu item.
 *
 * @param {Event} event - Click event.
 * @param {Array} menuArray - Array that contains menu items elements.
 * @return {Number} representing index of clicked menu item.
 */
const getIndexForMenuItemThatWasClicked = (event, menuArray) => {
  const target = (event && event.target) || (event && event.srcElement);

  // we build a "menuStates" array where we check if click was made on a menu item and
  // if so we flag as true index corresponding to that menu item and false to others
  const menuStates = menuArray.map((menu) => checkElementGenetics(menu, target));

  // return index of minimum positive bounding to know which menu item we should make active
  return menuStates.findIndex(item => item === true);
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

/**
 * Build the navigation menus
 */
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

/**
 * Hide the navigation menu
 */
const autoHideMenu = () => {
  // we set back isScrollingOn to false and hide header that contains navigation also
  isScrollingOn = false;
  header.classList.add("hidden")
};

/**
 * Add class "active" to section that is near top of viewport
 */
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

const showMenu = () => {
  if (!isScrollingOn) {
    // we set isScrollingOn to true and show header with navigation
    isScrollingOn = true;
    header.classList.remove("hidden");

    // we want to hide again the animation after one second
    setTimeout(autoHideMenu, 1000);
  }
};

/**
 * Scroll to section that corresponds to clicked menu item
 */
const scrollToClickedMenuItem = (event) => {
  event.preventDefault();

  // we find the index for menu item that was clicked based on event
  const indexOfClickedMenuItem = getIndexForMenuItemThatWasClicked(event, [...menuItems]);

  // knowing index of clicked menu item we are able to scroll to section that corresponds to this menu item
  const menuSection = sections[indexOfClickedMenuItem];
  const sectionTopBounding = menuSection.getBoundingClientRect().top;
  window.scrollTo({ top: window.scrollY + sectionTopBounding - 1, left: 0 });
};

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
buildMenu();

// Scroll to section on link click
navBar.addEventListener("click", scrollToClickedMenuItem);

// Set sections as active
document.addEventListener("scroll", activateMenuForMostVisibleSection);

// Set menu visible when we scroll
document.addEventListener("scroll", showMenu);
