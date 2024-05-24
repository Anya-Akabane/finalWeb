const body = document.querySelector("body");
const sidebar = document.querySelector(".sidebar");
const toggle = document.querySelector(".toggle");
const searchBtn = document.querySelector(".search-box");
const modeSwitch = document.querySelector(".toggle-switch");
const modeText = document.querySelector(".mode-text");

toggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
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

function openSection(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName(
    "profile__section__tab__tabcontent"
  );
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();



let input_Profile_Name = "Sad Mia";

let lcs_btn_i = document.querySelector(".lcs-btn_i");
let post_icon_btn_i = document.querySelector("#post-icon-btn_i");
let post_icon_text_i = document.querySelector("#post-icon-text_i");

lcs_btn_i.addEventListener("click", function () {
  post_icon_btn_i.classList.toggle("fas");
  post_icon_text_i.innerHTML = "Like";
  post_icon_text_i.classList.toggle("like-controle");
  post_icon_btn_i.classList.toggle("like-controle");
});

let activ_navbar = document.querySelector(".activ-navbar");




let lcs_btn_2i = document.querySelector(".lcs-btn_2i");
let post_icon_btn_2i = document.querySelector("#post-icon-btn_2i");
let post_icon_text_2i = document.querySelector("#post-icon-text_2i");

lcs_btn_2i.addEventListener("click", function () {
  post_icon_btn_2i.classList.toggle("fas");
  post_icon_text_2i.innerHTML = "Like";
  post_icon_text_2i.classList.toggle("like-controle");
  post_icon_btn_2i.classList.toggle("like-controle");
});



let lcs_btn_3i = document.querySelector(".lcs-btn_3i");
let post_icon_btn_3i = document.querySelector("#post-icon-btn_3i");
let post_icon_text_3i = document.querySelector("#post-icon-text_3i");

lcs_btn_3i.addEventListener("click", function () {
  post_icon_btn_3i.classList.toggle("fas");
  post_icon_text_3i.innerHTML = "Like";
  post_icon_text_3i.classList.toggle("like-controle");
  post_icon_btn_3i.classList.toggle("like-controle");
});

let lcs_btn_4i = document.querySelector(".lcs-btn_4i");
let post_icon_btn_4i = document.querySelector("#post-icon-btn_4i");
let post_icon_text_4i = document.querySelector("#post-icon-text_4i");

lcs_btn_4i.addEventListener("click", function () {
  post_icon_btn_4i.classList.toggle("fas");
  post_icon_text_4i.innerHTML = "Like";
  post_icon_text_4i.classList.toggle("like-controle");
  post_icon_btn_4i.classList.toggle("like-controle");
});

