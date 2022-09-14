//VERSION THAT USES FONTAWESOME

let card = document.querySelectorAll(".row-item");

// All the available cards
let cards = ["dog", "dog", "cat", "cat", "hippo", "hippo", "horse", "horse", "frog", "frog", "fish", "fish", "spider", "spider", "kiwi-bird", "kiwi-bird", "feather-pointed", "feather-pointed", "mosquito", "mosquito"]

// GAME - Create grid
//MISSING PART

// GAME - Grid easy (3 x 4 = 12)
let cardsEasy = cards.slice(0, 12)
//console.log("All cards - Grid easy(3x4)", cardsEasy)

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

// Function to create game grid with shuffled cards (using previous shuffle array function)
function setBoard(array) {
    let shuffledCards = shuffleArray(array)
    let allCards = document.querySelectorAll(".row-item");
    //console.log("Game grid with all shuffled shuffledCards", allCards);
    for (let i = 0; i < shuffledCards.length; i++) {
        ONLY WORKS WITH INTERNET
        allCards[i].innerHTML = `<i class="fa fa-${shuffledCards[i]} fa-4x"></i>`
    }
}

setBoard(cardsEasy)

// Function to show each card each time it is clicked
function showEachCard() {
    let allCardsElements = document.querySelectorAll(".row-item >i")
    console.log("allCards elements", allCardsElements)
    for (let i = 0; i < allCardsElements.length; i++) {
        allCardsElements[i].addEventListener("click", function (e) {
            allCardsElements[i].classList.toggle("visible")
            let visibleCards = document.querySelectorAll(".visible")
            checkEqualCards(visibleCards)
        })
    }
}

showEachCard()

let solvedCards = []

//TO BE CORRECTED FROM HERE ONWARDS

function checkEqualCards(array) {
    if (solvedCards.length >= 11) {
        console.log("GANHOU!")
    } else {
        setTimeout(function () {
            if (array[0].innerHTML !== array[1].innerHTML) {
                array[0].classList.remove("visible");
                array[1].classList.remove("visible")
            } else {
                array[0].classList.add("solved");
                array[1].classList.add("solved");
                console.log("solved", array)
                solvedCards.push(array[0])
                solvedCards.push(array[1])
                console.log("solvedcards", solvedCards)
                setTimeout(function () {
                    array[0].classList.remove("visible");
                    array[1].classList.remove("visible");
                }, 1000)
            }
        }, 1500)
    }
}

// ______________________________________
/*FONT AWESOME - Free icons
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