//PART 1 - GAME MENU

//Get the name inserted by the player
let name = document.querySelector("#player-name")

//PART 2 - GAME
// All the available cards
let cards = ["☀️", "☀️", "🐻", "🐻", "🐣", "🐣", "🐸", "🐸", "🐶", "🐶", "😸", "😸", "🌻", "🌻", "🦴", "🦴", "🌍", "🌍", "👩‍", "👩‍"]

//Create three grids - Easy(3x4), Medium(4x4) and Hard(5x4)
let gridsAvailable = document.querySelectorAll(".grid-item")
let cardsForGrids = [cards.slice(0, 12), cards.slice(0, 16), cards]

function selectGrid() {
    for (let i = 0; i < gridsAvailable.length; i++) {
        gridsAvailable[i].addEventListener("click", function (e) {
            document.querySelector(".player").innerHTML = `${name.value} is now playing`
            document.querySelector(".menu-container").classList.add("hidden")
            document.querySelector(".game-container").classList.remove("hidden")
            startGame(cardsForGrids[i])
        })
    }
}

selectGrid()

function startGame(cards_board) {

    // Time counter - Inspiration gotten from https://www.delftstack.com/howto/javascript/javascript-count-up-timer/
    let gameCounter = setInterval(countUpTime, 1000)
    let start = 0
    function countUpTime() {
        start++
        let hours = Math.floor(start / 3600)
        let minutes = Math.floor(start / 60)
        let seconds = start - (hours * 3600 + minutes * 60);
        if (seconds < 10) {
            document.querySelector(".counter p").innerHTML = `${minutes}:0${seconds}`
        } else {
            document.querySelector(".counter p").innerHTML = `${minutes}:${seconds}`
        }
    }

    // Function to shuffle obtained in the www
    function shuffleArray(array) {
        //DELETE - Used only for testing and is defining that the cards show in original array order
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
    }

    setBoard(cards_board)

    let allCards = document.querySelectorAll(".game-item");

    // Function to show each card each time it is clicked
    function showEachCard() {
        for (let i = 0; i < allCards.length; i++) {
            allCards[i].addEventListener("click", function (e) {
                if (!allCards[i].classList.contains("solved")) {
                    allCards[i].classList.add("visible");
                    let visibleCards = document.querySelectorAll(".visible");
                    checkEqualCards(visibleCards);
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
                let cardsSolved = document.querySelectorAll(".game-item.solved")

                // PART 3 - END OF GAME
                // CHECK if the game is over
                if (cardsSolved.length !== allCards.length) {
                    array[0].classList.remove("visible");
                    array[1].classList.remove("visible");
                } else {
                    //Stop counter time
                    clearInterval(gameCounter)

                    array[0].classList.remove("visible");
                    array[1].classList.remove("visible");

                    // Hide the game and show the final window
                    document.querySelector(".game-container").classList.add("hidden");
                    document.querySelector(".winner-container").classList.remove("hidden")

                    let playAgainButton = document.querySelector(".play-again")
                    playAgainButton.addEventListener("click", function (e) {
                        window.location.reload()
                    })
                    let menuButton = document.querySelector(".menu-button")
                    menuButton.addEventListener("click", function (e) {
                        window.location = "../index.html"
                    })

                    // Collect data from each game and save it to local storage
                    let date = new Date()
                    let duration = document.querySelector(".counter p").innerHTML
                    highScore.push(
                        {
                            "game": "Memory Game",
                            "name": name.value,
                            "date": `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`,
                            "time": `${date.getHours()}:${date.getMinutes()}`,
                            "duration": `${duration}`
                        })
                    localStorage.setItem("scores", JSON.stringify(highScore));
                }
            }
        }, 1500)
    }
}

//LOCAL STORAGE - Create new clean array to store the highscores for the fisrt time it is accessed by each browser (localstorage saves data for a "considerable period" of time)
let highScore = JSON.parse(localStorage.getItem("scores"));
if (!highScore) {
    highScore = [];
    console.log("highscorearray", highScore)
}
