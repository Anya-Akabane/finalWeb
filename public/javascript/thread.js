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
