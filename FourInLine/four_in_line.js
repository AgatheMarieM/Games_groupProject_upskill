//Initialize the page WITHOUT the game
let landingPage = document.querySelector(".lp-4inline");
let gamePage = document.querySelector(".game-4inline");
gamePage.style.display = 'none';

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
    /*gameGrid.style.display = "block";
    displayGrid();*/
    interval = setInterval(updateTimer, 10);//the delay is set to 10.
    // if delay not specified the timer runs too fast. WHY?

    function updateTimer() {
        milliseconds += 10;
        if (milliseconds === 1000) {
            milliseconds = 0;
            seconds++;

            if (seconds === 60) {
                seconds = 0;
                minutes++;

                if (minutes === 60) {
                    minutes = 0;
                    hours++;
                }
            }
        }

        timerElement.innerHTML = `${hours}:${minutes}:${seconds}`;
    }

});

//Playing 4 in line:
let playerRed = "redCell";
let playerYellow = "yellowCell";
let currentPlayer = playerRed;

/*Primeira tentative complicada:
let emptyCell = [];

function colorBottomCell(coluna, indice_coluna) {
    let cells = Array.from(coluna.querySelectorAll(".div-cell")); //creating array of cells
    let i = cells.length - 1;
    if (!emptyCell[indice_coluna])
        emptyCell[indice_coluna] = cells[i];

    if (emptyCell[indice_coluna].style.backgroundColor === "red") {
        emptyCell[indice_coluna] = cells[cells.indexOf(emptyCell[indice_coluna]) - 1];
    }
    emptyCell[indice_coluna].style.backgroundColor = "red";
    emptyCell[indice_coluna].classList.add("player1");
}
*/

function getWinner() {
    //victoria horizontal
    //4 cellulas identicas horizontalmente: AO-BO-CO-DO por exemplo
}

function colorCells(column) {
    let cells = column.querySelectorAll(".div-cell"); //creating array of cells for the column from columnNodeList
    for (let i = cells.length - 1; i >= 0; i--) {
        if (!cells[i].classList.contains(playerRed) && !cells[i].classList.contains(playerYellow)) {
            cells[i].classList.add(currentPlayer);
            if (currentPlayer === playerRed)
                currentPlayer = playerYellow;
            else
                currentPlayer = playerRed;
            break;
        }
    }
    getWinner();
}


//Selection all columns from document:
let columnNodeList = document.querySelectorAll(".div-col");//array with 7 columns
console.log(columnNodeList);

//Selecting all rows:
// let rowArrays = [];
let colArrays = [];

/*for (let i = 0; i < rows; i++) {
    rowArrays[i] = [];
    for (let j = 0; j < columnNodeList.length; j++) {
        rowArrays[i][j] = columnNodeList[j].querySelectorAll(".div-cell")[i];
    }
}*/

for (let j = 0; j < columnNodeList.length; j++) {
    colArrays[j] = columnNodeList[j].querySelectorAll(".div-cell");
    console.log(colArrays[j]);
}


columnNodeList.forEach(function (column) {
    column.addEventListener("click", function () {
        colorCells(column)
    });
    //event for each column of the array
    //anonymous function needed to prevent the default behavior;
})


// trying to print the board game with javascript and work with rowArray and colArray since the beginning:


/*
let gameGrid = document.querySelector(".game-grid");
gameGrid.style.display = 'none';
let rows = 6;
let cols = 7;
let colArray = [];

function displayGrid() {
    for (let i = 0; i < cols; i++) {
        gameGrid.innerHTML += `
        <div class="div-col">
            <div class="div-cell"></div>
            <div class="div-cell"></div>
            <div class="div-cell"></div>
            <div class="div-cell"></div>
            <div class="div-cell"></div>
            <div class="div-cell"></div>
        </div>`;
        colArray[i] = gameGrid.innerHTML;
        console.log(colArray[i]);
    }
}
*/


