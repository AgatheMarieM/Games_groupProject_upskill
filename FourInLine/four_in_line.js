/*
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


function groupCells(column) {
    let cells = column.querySelectorAll(".div-cell"); //creating array of cells for each column
    for (let i = cells.length-1; i >=0 ; i--) {
        if (player === 1 ) {
            cells[i].style.backgroundColor = "red";
            cells[i].classList.add("player1");

        } else {
            cells[i].style.backgroundColor = "yellow";
            cells[i].classList.add("player2")

        }
    }
}

//Initialize the game with the columns from the document,
//initialize player;
let player = 1; //start mock up with player1

let gridArrays = document.querySelectorAll(".div-col");
for (let i = 0; i < gridArrays.length; i++) {
    gridArrays[i].addEventListener("click", groupCells(gridArrays[i])) //adding event for each column of the array
    ;
}
;

