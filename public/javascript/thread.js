modeSwitch.addEventListener("click", () => {

    var card = document.getElementsByClassName('card');
    
    for (let i = 0; i < card.length; i += 1) {
    card[i].classList.toggle("card-dark");
    }
    
})

//Using profile -> Switch theme
const darkModeToggle = document.getElementById("darkModeToggle");

darkModeToggle.addEventListener("click", () => {

    var card = document.getElementsByClassName('card');
    
    for (let i = 0; i < card.length; i += 1) {
    card[i].classList.toggle("card-dark");
    }
    
})

// 3dot
// const menuContainer = document.querySelector(".menu-container");
// const menuBtn = document.querySelector(".menu-btn");
// const dropdownMenu = document.querySelector(".dropdown-menu");

// menuBtn.addEventListener("click", () => {
//   dropdownMenu.classList.toggle("show");
// });

// menuContainer.addEventListener("focusout", (event) => {
//   if (!event.currentTarget.contains(event.relatedTarget)) {
//     dropdownMenu.classList.remove("show");
//   }
// });
