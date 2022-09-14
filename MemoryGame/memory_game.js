let card = document.querySelectorAll(".row-item");

// All the available cards
//let cards = ["1", "1", "2", "2", "3", "3", "4", "4", "5", "5", "6", "6", "7", "7", "8", "8", "9", "9", "10", "10"]
//POSSIBLE NEW ICONS
let cards = ["☀️", "☀️", "🐻", "🐻", "👩‍", "👩‍", "🌍", "🌍", "🌻", "🌻", "🐶", "🐶", "😸", "😸", "🦴", "🦴", "🐸", "🐸", "🐣", "🐣"]

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
        allCards[i].innerHTML = `<span>${shuffledCards[i]}</span>`
    }
}

setBoard(cardsEasy)

// Function to show each card each time it is clicked
function showEachCard() {
    let allCardsElements = document.querySelectorAll(".row-item") //THE SAME AS IN LINE 36?
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