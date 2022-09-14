//let playerRed = "Red";


//get player names and show them on the game page:
let playerRedName = document.querySelector("#player1name");
let playerYellowName = document.querySelector("#player2name");
""
let boxNamePlayerRed = document.querySelector("#name-player1");
let boxNamePlayerYellow = document.querySelector("#name-player2");

playerRedName.addEventListener("input", displayPlayerName(playerRedName));

function displayPlayerName(event) {

    boxNamePlayerRed.innerHTML = playerRedName.value;
}


let playerRed = "redCell";
let playerYellow = "yellowCell";
//let playerYellow = "Yellow";
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


function colorCells(column) {
    let cells = column.querySelectorAll(".div-cell"); //creating array of cells for the column from gridArrays
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
}


//Initialize the game with the columns from the document
let gridArrays = document.querySelectorAll(".div-col");//array with 7 columns

gridArrays.forEach(function (column) {
    column.addEventListener("click", function () {
        colorCells(column)
    });
    //event for each column of the array
    //anonymous function needed to prevent the default behavior;
})



