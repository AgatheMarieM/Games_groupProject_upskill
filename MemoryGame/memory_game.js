// All the available cards
//let cards = ["1", "1", "2", "2", "3", "3", "4", "4", "5", "5", "6", "6", "7", "7", "8", "8", "9", "9", "10", "10"]
let cards = ["☀️", "☀️", "🐻", "🐻", "👩‍", "👩‍", "🌍", "🌍", "🌻", "🌻", "🐶", "🐶", "😸", "😸", "🦴", "🦴", "🐸", "🐸", "🐣", "🐣"]
let allCards = document.querySelectorAll(".row-item");

// GAME - Create grid
//MISSING PART

// GAME - Grid easy (3 x 4 = 12)
let cardsEasy = cards.slice(0, 12)
//console.log("All cards - Grid easy(3x4)", cardsEasy)

// Function to shuffle obtained in the www
function shuffleArray(array) {
    let curId = array.length;
    while (0 !== curId) { // There remain elements to shuffle
        let randId = Math.floor(Math.random() * curId); // Pick a remaining element
        curId -= 1;
        let tmp = array[curId]; // Swap it with the current element.
        array[curId] = array[randId];
        array[randId] = tmp;
    }
    return array;
}

// Function to create game grid with shuffled cards (using previous shuffle array function)
function setBoard(array) {
    let shuffledCards = shuffleArray(array)
    //console.log("Game grid with all shuffled shuffledCards", allCards);
    for (let i = 0; i < shuffledCards.length; i++) {
        allCards[i].innerHTML = `<span>${shuffledCards[i]}</span>`
    }
}

setBoard(cardsEasy)

// Function to show each card each time it is clicked
let solvedCards = []
function showEachCard() {
    for (let i = 0; i < allCards.length; i++) {
        allCards[i].addEventListener("click", function (e) {
            if (solvedCards.length === 12) {
                console.log("GANHOU!")
            } else {
                allCards[i].classList.toggle("visible")
                let visibleCards = document.querySelectorAll(".visible")
                checkEqualCards(visibleCards)
            }
        })
    }
}

showEachCard()

function checkEqualCards(array) {
    setTimeout(function () {
        if (array[0].innerHTML !== array[1].innerHTML) {
            array[0].classList.remove("visible");
            array[1].classList.remove("visible")
        } else {
            array[0].classList.add("solved");
            array[1].classList.add("solved");
            //console.log("solved", array)
            solvedCards.push(array[0])
            solvedCards.push(array[1])
            //console.log("solvedcards", solvedCards)
            setTimeout(function () {
                array[0].classList.remove("visible");
                array[1].classList.remove("visible");
                }, 1000)
            }
        }, 1500)
    }