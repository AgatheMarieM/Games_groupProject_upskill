// All the available cards
//let cards = ["1", "1", "2", "2", "3", "3", "4", "4", "5", "5", "6", "6", "7", "7", "8", "8", "9", "9", "10", "10"]
let cards = ["☀️", "☀️", "🐻", "🐻", "🐣", "🐣", "🐸", "🐸", "🐶", "🐶", "😸", "😸", "🌻", "🌻", "🦴", "🦴", "🌍", "🌍", "👩‍", "👩‍"]

// GAME - Create grid
let gridsAvailable = document.querySelectorAll(".grid-item")
let cardsForGrids = [cards.slice(0, 12), cards.slice(0, 16), cards]

function selectGrid() {
    for (let i = 0; i < gridsAvailable.length; i++) {
        gridsAvailable[i].addEventListener("click", function (e) {
            console.log("clickedgridsize", cardsForGrids[i].length)
            startGame(cardsForGrids[i])
        })
    }
}

selectGrid()

function startGame(cards_board) {

    //TIME COUNTER - Inspiration gotten from the www (https://www.delftstack.com/howto/javascript/javascript-count-up-timer/)
    setInterval(countUpTime, 1000)
        let start = 0
        function countUpTime() {
            start++
            let hours = Math.floor(start / 3600)
            let minutes = Math.floor(start/ 60)
            let seconds = start- (hours * 3600 + minutes * 60);
            document.querySelector(".counter p").innerHTML = `${hours}:${minutes}:${seconds}`
            //console.log(hours,minutes,seconds)
        }

    // Function to shuffle obtained in the www
    function shuffleArray(array) {
        //DELETE - Is defining that the cards show in original array order
        return array;
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

    let gridGame = document.querySelector(".grid-game")

    // Function to create game grid with shuffled cards (using previous shuffle array function)
    function setBoard(array) {
        let shuffledCards = shuffleArray(array)
        for (let i = 0; i < shuffledCards.length; i++) {
            gridGame.innerHTML += `
                <div class="game-item"><span>${shuffledCards[i]}</span></div>`;
        }
        console.log(gridGame)
    }

    setBoard(cards_board)

    let allCards = document.querySelectorAll(".game-item");
    console.log("allcards", allCards)

    // Function to show each card each time it is clicked
    function showEachCard() {
        for (let i = 0; i < allCards.length; i++) {
            allCards[i].addEventListener("click", function (e) {
                //QUESTION - Changed "toggle" to "add". What would be better?
                //QUESTION - This condition can only verify if !== visible, or both?
                if (!allCards[i].classList.contains("solved")) {
                    allCards[i].classList.add("visible");
                    let visibleCards = document.querySelectorAll(".visible");
                    checkEqualCards(visibleCards);
                    console.log("visiblecards", visibleCards)
                }
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
                let cardsSolved = document.querySelectorAll(".game-item.solved")
                //CHECK if the game is over
                if (cardsSolved.length !== allCards.length) {
                    setTimeout(function () {
                        array[0].classList.remove("visible");
                        array[1].classList.remove("visible");
                    }, 1)
                } else {
                    window.alert("GANHOU!")
                    // Necessary? Just to hide cards after the final move, so that all the board looks the same
                    setTimeout(function () {
                        array[0].classList.remove("visible");
                        array[1].classList.remove("visible");
                    }, 1)
                }
            }
        }, 500)
    }
}




