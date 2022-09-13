let card = document.querySelectorAll(".row-item");
console.log("Individual card position item", card)

// All the available cards
let cards = ["dog", "dog", "cat", "cat", "hippo", "hippo", "horse", "horse", "frog", "frog", "fish", "fish", "spider", "spider", "kiwi-bird", "kiwi-bird", "feather-pointed", "feather-pointed", "mosquito", "mosquito"]

// GAME - Grid easy (3 x 4 = 12)
let cardsEasy = cards.slice(0, 12)
console.log("All cards - Grid easy(3x4)", cardsEasy)

// Function to shuffle obtained in the www
function shuffleArray(array) {
    let curId = array.length;
    // There remain elements to shuffle
    while (0 !== curId) {
        // Pick a remaining element
        let randId = Math.floor(Math.random() * curId);
        curId -= 1;
        // Swap it with the current element.
        let tmp = array[curId];
        array[curId] = array[randId];
        array[randId] = tmp;
    }
    return array;
}

function setBoard(array) {
    let cards = shuffleArray(array)
    let board = document.querySelectorAll(".row-item");
    console.log("Game grid with shuffled cards", board);
    for (let i = 0; i < cards.length; i++) {
        board[i].innerHTML = `<i class="fa fa-${cards[i]} fa-4x"></i>`
    }
}

setBoard(cardsEasy)

let newBoard = document.querySelectorAll(".row-item");
console.log(newBoard[0].innerHTML)

function showEachCard() {
    let showCard = document.querySelectorAll(".row-item")
    console.log(showCard)
    for (let i = 0; i < showCard.length; i++) {
        showCard[i].addEventListener("click", function (e) {
            console.log(showCard[i])
            showCard[i].classList.toggle("test")
        })
    }
}

showEachCard()


/*CARDS - Free
<i class="fa-solid fa-dog"></i>
<i class="fa-solid fa-cat"></i>
<i class="fa-light fa-hippo"></i>
<i class="fa-light fa-horse"></i>
<i class="fa-solid fa-frog"></i>
<i class="fa-solid fa-fish"></i>
<i class="fa-solid fa-spider"></i>
<i class="fa-solid fa-kiwi-bird"></i>
<i class="fa-solid fa-feather-pointed"></i>
<i class="fa-solid fa-mosquito"></i>

Other animals https://fontawesome.com/icons/categories/animals
Other icons https://www.w3schools.com/icons/
 */