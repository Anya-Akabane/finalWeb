const body = document.querySelector("body");
const sidebar = document.querySelector(".sidebar");
const toggle = document.querySelector(".toggle");
const searchBtn = document.querySelector(".search-box");
const modeSwitch = document.querySelector(".toggle-switch");
const modeText = document.querySelector(".mode-text");

toggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

toggle.setAttribute('aria-label', 'Toggle sidebar');
toggle.setAttribute('tabindex', '0');
toggle.setAttribute('role', 'toggle button');

toggle.addEventListener('keydown', function (e) {
  if (e.code === 'Enter') {
    sidebar.classList.toggle("close");
  }
});

searchBtn.addEventListener("click", () => {
  sidebar.classList.remove("close");
});

modeSwitch.addEventListener("click", () => {
  body.classList.toggle("dark");
  modeText.textContent = body.classList.contains("dark")
    ? "Light Mode"
    : "Dark Mode";
});

const sections = document.querySelectorAll("section[id]");
function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}

window.addEventListener("scroll", scrollActive);

function scrollHeader() {
  const header = document.getElementById("header");
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 80) header.classList.add("scroll-header");
  else header.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

// topbar
let subMenus = document.getElementById("subMenus");

function toggleMenus() {
  subMenus.classList.toggle("open-menus");
}

// notification
document.addEventListener("DOMContentLoaded", function () {
  var items = document.querySelectorAll(".notification-drop .item");

  items.forEach(function (item) {
    item.addEventListener("click", function () {
      var ul = this.querySelector("ul");
      if (ul.style.display === "block") {
        ul.style.display = "none";
      } else {
        ul.style.display = "block";
      }
    });
  });
});

// darkmode

const darkModeToggle = document.getElementById("darkModeToggle");

darkModeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  modeText.textContent = body.classList.contains("dark")
    ? "Light Mode"
    : "Dark Mode";
});

