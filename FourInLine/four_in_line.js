//Load landing page WITHOUT the game
let landingPage = document.querySelector(".lp-4inline");
let gamePage = document.querySelector(".game-4inline");
gamePage.style.display = 'none';

let playerNames = document.querySelector(".current-players");
let winnerName = document.querySelector(".winner-name");
winnerName.style.display = 'none';

//get player names values (then we'll show them on game page):
let playerRedName = document.querySelector("#playerRedName");
let boxPlayerRed = document.querySelector("#name-playerRed");

let playerYellowName = document.querySelector("#playerYellowName");
let boxPlayerYellow = document.querySelector("#name-playerYellow");

playerRedName.addEventListener("input", function (e) {
    boxPlayerRed.innerHTML = e.target.value;
})
playerYellowName.addEventListener("input", function (e) {
    boxPlayerYellow.innerHTML = e.target.value;
})

//On clicking start button, the landing-page disappears and the game is on display
//startButton also starts the stopwatch(timer)!

let startButton = document.querySelector("#start-button");
let timerElement = document.querySelector("#timer");
let interval = null;
let [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];


startButton.addEventListener("click", function startPlaying() {
    landingPage.style.display = 'none';
    gamePage.style.display = "block";
    interval = setInterval(updateTimer, 1000);//the delay is set to 1000 ms (1sc)

    function updateTimer() {
        milliseconds += 1000;
        if (milliseconds === 1000) {
            milliseconds = 0;
            seconds++;
            if (seconds < 10) {
                seconds = '0' + seconds;
                if (seconds === 60) {
                    minutes++;
                    seconds = 0;
                    if (minutes === 60) {
                        minutes = 0;
                        hours++;
                    }
                }
            }
        }

        timerElement.innerHTML = `${hours}:${minutes}:${seconds}`;
    }

});

//Clicking cells and playing the game:
let playerRed = "redCell";
let playerYellow = "yellowCell";
let currentPlayer = playerRed; //we start with red
let gameOver = false;
// ASK PLAYERS WHO WANTS TO START?

//new variable columnList that stores all columns from document
//adding an event for each column (calling colorCells() function)
let columnList = document.querySelectorAll(".div-col");//array with 7 columns
columnList.forEach(function (column) {
    column.addEventListener("click", function () {
        colorCells(column)
    });
    //anonymous function needed to prevent the default behavior;
})

function colorCells(column) {
    //creating locally an array of cells for the column from columnList:
    let cells = column.querySelectorAll(".div-cell");
    console.log(cells);
    //looping through all cells:
    for (let i = cells.length - 1; i >= 0; i--) {
        if (!cells[i].classList.contains(playerRed) && !cells[i].classList.contains(playerYellow)) {
            cells[i].classList.add(currentPlayer);
            //reading document from bottom to top: if the last indice of the cells array doesn't contain class
            // with player color, then we add it: playerRed or playerYellow
            if (currentPlayer === playerRed)
                currentPlayer = playerYellow;
            else
                currentPlayer = playerRed;
            break;
        }
    }
    getWinner();
}

//new variable colCellsList that store for each column its n cells
//allows us to access later the state of each cell (red or yellow?)
let colCellsList = [];
for (let j = 0; j < columnList.length; j++) {
    colCellsList[j] = columnList[j].querySelectorAll(".div-cell");
}


function getWinner() {
    //victoria horizontal
    /* let rowArrays = [];
        for (let i = 0; i < rows; i++) {
        rowArrays[i] = [];
        for (let j = 0; j < columnList.length; j++) {
            rowArrays[i][j] = columnList[j].querySelectorAll(".div-cell")[i];
        }
    }*/
    for (let i = 0; i < colCellsList.length; i++) { // 7 columns in colCellsList, i goes until 6
        for (let j = 0; j < colCellsList[i].length; j++) { // each column has 6 elements, j goes to 5
            //Vertical victory:
            if (colCellsList[i][j].classList.contains(playerRed)
                && colCellsList[i][j - 1].classList.contains(playerRed)
                && colCellsList[i][j - 2].classList.contains(playerRed)
                && colCellsList[i][j - 3].classList.contains(playerRed)) {
                // console.log("Red Player wins");
                displayWinnerName(`${playerRedName.value} wins!`);
                gameOver = true;
                return;
            }
            if (colCellsList[i][j].classList.contains(playerYellow)
                && colCellsList[i][j - 1].classList.contains(playerYellow)
                && colCellsList[i][j - 2].classList.contains(playerYellow)
                && colCellsList[i][j - 3].classList.contains(playerYellow)) {
                // console.log("Yellow player wins");
                displayWinnerName(`${playerYellowName.value} wins!`);
                gameOver = true;
                return;
            }
            //Horizontal victory:
            if (colCellsList[i][j].classList.contains(playerRed)
                && colCellsList[i + 1][j].classList.contains(playerRed)
                && colCellsList[i + 2][j].classList.contains(playerRed)
                && colCellsList[i + 3][j].classList.contains(playerRed)) {
                displayWinnerName(`${playerRedName.value} wins!`);
                gameOver = true;
                return;
            }
            if (colCellsList[i][j].classList.contains(playerYellow)
                && colCellsList[i + 1][j].classList.contains(playerYellow)
                && colCellsList[i + 2][j].classList.contains(playerYellow)
                && colCellsList[i + 3][j].classList.contains(playerYellow)) {
                displayWinnerName(`${playerYellowName.value} wins!`);
                gameOver = true;
                return;
            }
            // Diagonal up->down victory:
            if (colCellsList[i][j].classList.contains(playerRed)
                && colCellsList[i + 1][j + 1].classList.contains(playerRed)
                && colCellsList[i + 2][j + 2].classList.contains(playerRed)
                && colCellsList[i + 3][j + 3].classList.contains(playerRed)) {
                displayWinnerName(`${playerRedName.value} wins!`);
                return;
            }
            if (colCellsList[i][j].classList.contains(playerYellow)
                && colCellsList[i + 1][j + 1].classList.contains(playerYellow)
                && colCellsList[i + 2][j + 2].classList.contains(playerYellow)
                && colCellsList[i + 3][j + 3].classList.contains(playerYellow)) {
                displayWinnerName(`${playerYellowName.value} wins!`);
                return;
            }
            if (colCellsList[i][j+1].classList.contains(playerRed)
                && colCellsList[i + 1][j + 2].classList.contains(playerRed)
                && colCellsList[i + 2][j + 3].classList.contains(playerRed)
                && colCellsList[i + 3][j + 4].classList.contains(playerRed)) {
                displayWinnerName(`${playerRedName.value} wins!`);
                return;
            }
            if (colCellsList[i][j+1].classList.contains(playerYellow)
                && colCellsList[i + 1][j + 2].classList.contains(playerYellow)
                && colCellsList[i + 2][j + 3].classList.contains(playerYellow)
                && colCellsList[i + 3][j + 4].classList.contains(playerYellow)) {
                displayWinnerName(`${playerYellowName.value} wins!`);
                return;
            }          
                       
            if (colCellsList[i][j+2].classList.contains(playerRed)
                && colCellsList[i + 1][j + 3].classList.contains(playerRed)
                && colCellsList[i + 2][j + 4].classList.contains(playerRed)
                && colCellsList[i + 3][j + 5].classList.contains(playerRed)) {
                displayWinnerName(`${playerRedName.value} wins!`);
                return;
            }
            if (colCellsList[i][j+2].classList.contains(playerYellow)
                && colCellsList[i + 1][j + 3].classList.contains(playerYellow)
                && colCellsList[i + 2][j + 4].classList.contains(playerYellow)
                && colCellsList[i + 3][j + 5].classList.contains(playerYellow)) {
                displayWinnerName(`${playerYellowName.value} wins!`);
                return;
            }
            // Diagonal down->up victory:


        }
    }
}

//Display winner name on screen:
function displayWinnerName(str) {
    winnerName.style.display = 'flex';
    winnerName.innerHTML = str;
    playerNames.style.display = 'none';
}



