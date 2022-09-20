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
                    seconds = 0;
                    minutes++;
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

//The initial CurrentPlayer is defined by random number:
let currentPlayer;
let randomNumber = Math.random() * 10;
if (randomNumber < 5) {
    currentPlayer = playerRed;
    boxPlayerRed.style.backgroundColor = "red";

} else {
    currentPlayer = playerYellow;
    boxPlayerYellow.style.backgroundColor = "yellow";
}

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
    //looping through all cells:
    for (let i = cells.length - 1; i >= 0; i--) {
        if (!cells[i].classList.contains(playerRed) && !cells[i].classList.contains(playerYellow)) {
            cells[i].classList.add(currentPlayer);
            cells[i].setAttribute("player_color", currentPlayer);
            /*reading document from bottom to top: if the last indice of the cells array doesn't contain class
            with player color, then we add it: playerRed or playerYellow*/
            if (currentPlayer === playerRed) {
                currentPlayer = playerYellow;
                boxPlayerYellow.style.backgroundColor = "yellow";
                boxPlayerRed.style.backgroundColor = "white";

            } else {
                currentPlayer = playerRed;
                boxPlayerRed.style.backgroundColor = "red";
                boxPlayerYellow.style.backgroundColor = "white";
            }
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
    let rowsLength = 6; // creating a variable for rows, to iterate through them easily
    //Vertical four in line
    for (let i = 0; i < colCellsList.length; i++) { // 7 columns in colCellsList, i goes until 6
        for (let j = 0; j < colCellsList[i].length - 3; j++) { // each column has 6 elements, j goes to 5
            // console.log(colCellsList[i][j], colCellsList[i][j].getAttribute('player_color'));
            if (colCellsList[i][j].getAttribute('player_color') !== null) {
                //Vertical victory:
                if (colCellsList[i][j].getAttribute('player_color') === colCellsList[i][j + 1].getAttribute('player_color')
                    && colCellsList[i][j + 1].getAttribute('player_color') === colCellsList[i][j + 2].getAttribute('player_color')
                    && colCellsList[i][j + 2].getAttribute('player_color') === colCellsList[i][j + 3].getAttribute('player_color')) {
                    displayWinnerName(colCellsList[i][j].getAttribute('player_color'));
                    return;
                }
            }
        }
    }
    //Horizontal four in line
    for (let j = 0; j < rowsLength; j++) {
        for (let i = 0; i < colCellsList.length - 3; i++) {
            if (colCellsList[i][j].getAttribute('player_color') !== null) {
                if (colCellsList[i][j].getAttribute('player_color') === colCellsList[i + 1][j].getAttribute('player_color')
                    && colCellsList[i + 1][j].getAttribute('player_color') === colCellsList[i + 2][j].getAttribute('player_color')
                    && colCellsList[i + 2][j].getAttribute('player_color') === colCellsList[i + 3][j].getAttribute('player_color')) {
                    displayWinnerName(colCellsList[i][j].getAttribute('player_color'));
                    return;
                }
            }
        }
    }
    // Up to Bottom Diagonal four in line: \
    for (let j = 0; j < rowsLength - 3; j++) { // the last 3 rows cannot give diagonal 4 in line
        for (let i = 0; i < colCellsList.length - 3; i++) {
            if (colCellsList[i][j].getAttribute('player_color') !== null) {
                if (colCellsList[i][j].getAttribute('player_color') === colCellsList[i + 1][j + 1].getAttribute('player_color')
                    && colCellsList[i + 1][j + 1].getAttribute('player_color') === colCellsList[i + 2][j + 2].getAttribute('player_color')
                    && colCellsList[i + 2][j + 2].getAttribute('player_color') === colCellsList[i + 3][j + 3].getAttribute('player_color')) {
                    displayWinnerName(colCellsList[i][j].getAttribute('player_color'));
                    return;
                }
            }
        }
    }
    //Bottom - Up diagonal four in line: /
    for (let j = rowsLength - 3; j < rowsLength; j++) {// the first 3 rows cannot give diagonal 4 in line
        for (let i = 0; i < colCellsList.length - 3; i++) {
            //i<colCellsList.length - 3  otherwise loop breaks, the 3 last columns of each row can never give 4inLine diagonally
            if (colCellsList[i][j].getAttribute('player_color') !== null) {
                if (colCellsList[i][j].getAttribute('player_color') === colCellsList[i + 1][j - 1].getAttribute('player_color')
                    && colCellsList[i + 1][j - 1].getAttribute('player_color') === colCellsList[i + 2][j - 2].getAttribute('player_color')
                    && colCellsList[i + 2][j - 2].getAttribute('player_color') === colCellsList[i + 3][j - 3].getAttribute('player_color')) {
                    displayWinnerName(colCellsList[i][j].getAttribute('player_color'));
                    return;
                }
            }
        }
    }
}

//Display winner name on screen and go back to Menu or Play Again:
function displayWinnerName(cell) {
    let dateVictory = new Date();
    let redWinner = boxPlayerRed.innerHTML;
    let yellowWinner = boxPlayerYellow.innerHTML;
    winnerName.style.display = 'flex';
    playerNames.style.display = 'none';
    if (cell === 'redCell') {
        winnerName.innerHTML = `<div>
                                    ${redWinner} wins! 
                                </div>   
                                <a href="/index.html">
                                    Menu
                                </a>
                                <a href="four_in_a_line.html">
                                    Play again?
                                </a>                            
                                `;
        currentPlayer = playerRed; //tried to change currentPlayer value with winner color
        localStorage.setItem("date", dateVictory);
        localStorage.setItem("last winner", redWinner);
        console.log(localStorage);
    } else {

        winnerName.innerHTML = `<div>
                                    ${yellowWinner} wins! 
                                </div> 
                                <a href="/index.html">
                                    Menu
                                </a>   
                                <a href="four_in_a_line.html">
                                    Play again?
                                </a>                           
                                `;
        currentPlayer = playerYellow;//tried to change currentPlayer value with winner color
        localStorage.setItem("date", dateVictory);
        localStorage.setItem("last winner", yellowWinner);
        console.log(localStorage);
    }
    //LocalStorage of last victory:
    //PROBLEM: need to reach historico.html which is another DOM
    /*let fourInLineHistorico = document.getElementById("fourinline-container-historico");
    fourInLineHistorico.innerHTML = "Hello";*/
}



