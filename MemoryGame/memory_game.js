// All the available cards
//let cards = ["1", "1", "2", "2", "3", "3", "4", "4", "5", "5", "6", "6", "7", "7", "8", "8", "9", "9", "10", "10"]
let cards = ["☀️", "☀️", "🐻", "🐻", "👩‍", "👩‍", "🌍", "🌍", "🌻", "🌻", "🐶", "🐶", "😸", "😸", "🦴", "🦴", "🐸", "🐸", "🐣", "🐣"]
let allCards = document.querySelectorAll(".row-item");

// GAME - Create grid

let gridsAvailable = document.querySelectorAll(".grid-item")
let gridEasy = document.querySelectorAll(".grid-easy")
console.log("grideasy", gridEasy)

function selectGrid() {
    for (let i = 0; i < gridsAvailable.length; i++) {
        gridsAvailable[i].addEventListener("click", function (e) {
            setBoard(cardsEasy)
        })
    }
}

selectGrid()

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
    let gameRow = document.querySelectorAll(".game-row")
    console.log("gamerow", gameRow)

    for (let i = 0; i < shuffledCards.length; i++) {
        gameRow[i].innerHTML = `
            <div class="row-item">${shuffledCards[i]}</div>
            <div class="row-item">${shuffledCards[i+1]}</div>
            <div class="row-item">${shuffledCards[i+2]}</div>
            <div class="row-item">${shuffledCards[i+3]}</div>`

        //console.log("Game grid with all shuffled shuffledCards", allCards);
        //allCards[i].innerHTML = `<span>${shuffledCards[i]}</span>`
    }
}

// Function already called inside function selectGrid
//setBoard(cardsEasy)

// Function to show each card each time it is clicked
function showEachCard() {
    //QUESTION - What is the limit of this cycle, when does it stop? I've set it to 1000 clicks...!?!
    for (let i = 0; i < 1000; i++) {
        allCards[i].addEventListener("click", function (e) {
            //Change "toggle" to "add"
            allCards[i].classList.add("visible")
            let visibleCards = document.querySelectorAll(".visible")
            checkEqualCards(visibleCards)
        })
    }
}

showEachCard()

//Function to check if cards match
function checkEqualCards(array) {
    setTimeout(function () {
        if (array[0].innerHTML !== array[1].innerHTML) {
            array[0].classList.remove("visible");
            array[1].classList.remove("visible")
        } else {
            array[0].classList.add("solved");
            array[1].classList.add("solved");
            //QUESTION - HOW to return this number to be used in another function to define if the game has ended, or not??! If test===12...GANHOU!
            let cardsSolved = document.querySelectorAll(".row-item.solved").length
            console.log("test", cardsSolved)
            if (cardsSolved === 12) {
                console.log("GANHOU")
                window.alert("GANHOU!")
            } else {
                setTimeout(function () {
                    array[0].classList.remove("visible");
                    array[1].classList.remove("visible");
                }, 1000)
            }
        }
    }, 1500)
}

//QUESTION - HOW to return this number to be used in another function to define if the game has ended, or not??! If test===12...GANHOU!
//solvedCards.push(array[0])
//solvedCards.push(array[1])
// QUESTION - How to use this value to check if game has ended. Suggestion - array solved with 12 elements
//console.log("solvedcards", solvedCards)