import data from "./database(temp)/temp.json" assert { type: 'json' };

const totalRecipe = data.post.length;

const recipeList = document.querySelector('.recipe-row');

for (let i = 0; i < totalRecipe; i+= 1) {

    let recipeData = data.post[i];

    //Create an empty card
    let card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('recipe-card');

    //Get cover image
    let cover = document.createElement('div');
    cover.classList.add('coverImage')
    let img = document.createElement('img');
    img.src = recipeData.image;
    img.alt = "coverImage";

    cover.appendChild(img);

    //Get card body
    let cardBody = document.createElement('div');
    cardBody.classList.add('recipe-card-body');

    //Title
    let title = document.createElement('h5');
    title.classList.add('recipe-card-title');
    title.innerHTML = recipeData.name;

    //Author and date
    let authorDate = document.createElement('div');
    authorDate.classList.add('author-date');

    let author = document.createElement('p');
    author.classList.add('author');
    author.innerHTML = "By " + recipeData.user;

    let date = document.createElement('p');
    date.classList.add('date');
    let small = document.createElement('small');
    small.innerHTML = "&#x2022; " + recipeData.date;

    authorDate.appendChild(author);
    authorDate.appendChild(date);

    //Rating
    let totalRating = document.createElement('div');
    totalRating.classList.add("recipe-rating");

    let star = recipeData.rating;
    for (let j = 0; j < star; j++) {
        let rating = document.createElement('i');
        rating.className = "bx bxs-star";
        totalRating.appendChild(rating);
    }

    let remain = 5 - star;
    if (remain > 0) {
        for (let j = 0; j < remain; j++) {
            let rating = document.createElement('i');
            rating.className = "bx bx-star";
            totalRating.appendChild(rating);
        }
    }

    //Find more button
    let container = document.createElement('div');
    container.classList.add('findmore-button-container');

    let button = document.createElement('a');
    button.href = "a"
    button.classList.add('findmore-button')
    button.innerHTML = "Find More";

    container.appendChild(button);

    cardBody.appendChild(title);
    cardBody.appendChild(authorDate);
    cardBody.appendChild(totalRating);
    cardBody.appendChild(container);

    card.appendChild(cover);
    card.appendChild(cardBody);

    recipeList.appendChild(card);

}

//Functionality (put in diffenrent file for organization)
const modeSwitch = document.querySelector(".toggle-switch");

modeSwitch.addEventListener("click", () => {

    var card = document.getElementsByClassName('recipe-card');
    
    for (let i = 0; i < card.length; i += 1) {
    card[i].classList.toggle("card-dark");
    }
    
})

//Using profile -> Switch theme
const darkModeToggle = document.getElementById("darkModeToggle");

darkModeToggle.addEventListener("click", () => {

    var card = document.getElementsByClassName('recipe-card');
    
    for (let i = 0; i < card.length; i += 1) {
    card[i].classList.toggle("card-dark");
    }
    
})