import data from "./database(temp)/temp.json" assert { type: 'json' };

const totalThreads = data.thread.length;

const threadList = document.querySelector('.threads-row');

for (let i = 0; i < totalThreads; i+= 1){

    let threadData = data.thread[i];

    //Create an empty thread card
    let card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('thread-card');
    
    //Create thread heading
    let heading = document.createElement('div');
    heading.classList.add('image-text');

    //Add image
    let img = document.createElement('img');
    img.src = threadData.threadIcon;
    img.style = "width: 50px; height: 50px;";
    
    //Create title for heading
    let title = document.createElement('p');
    title.classList.add('card-title');
    
    let strong = document.createElement('strong');
    strong.innerHTML = threadData.title
    title.appendChild(strong);

    let pin = document.createElement('i');
    pin.classList.add('bx');
    pin.classList.add('bx-pin');
    pin.classList.add('pin-item');

    heading.appendChild(img);
    heading.appendChild(title);
    heading.appendChild(pin);

    //Add viewThread and ... button
    let viewMore = document.createElement('div');
    viewMore.classList.add('view-more');

    let viewThread = document.createElement('a');
    viewThread.href = "#";
    viewThread.classList.add('viewThread-button')
    viewThread.role = 'button';
    viewThread.innerHTML = "View Threads"

    let more = document.createElement('a');
    more.href = "#";
    more.classList.add('dropdown-toggle');

    let moreIcon = document.createElement('i');
    moreIcon.classList.add('bx');
    moreIcon.classList.add('bx-dots-horizontal-rounded');
    moreIcon.classList.add('more-option');

    more.appendChild(moreIcon);

    viewMore.appendChild(viewThread);
    viewMore.appendChild(more);

    card.appendChild(heading);
    card.appendChild(viewMore);

    threadList.appendChild(card)

}

//Functionality (put in diffenrent file for organization)
modeSwitch.addEventListener("click", () => {

    var card = document.getElementsByClassName('thread-card');
    
    for (let i = 0; i < card.length; i += 1) {
    card[i].classList.toggle("card-dark");
    }
    
})

//Using profile -> Switch theme
const darkModeToggle = document.getElementById("darkModeToggle");

darkModeToggle.addEventListener("click", () => {

    var card = document.getElementsByClassName('thread-card');
    
    for (let i = 0; i < card.length; i += 1) {
    card[i].classList.toggle("card-dark");
    }
    
})