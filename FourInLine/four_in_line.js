let playerRed = "Red";
let playerYellow = "Yellow";
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
    for(let i=cells.length-1; i>=0; i--){
        if (currentPlayer === playerRed && !cells[i].classList.contains("redCell") && !cells[i].classList.contains("yellowCell")) {
            cells[i].style.backgroundColor = "red";
            cells[i].classList.add("redCell");
            currentPlayer = playerYellow;
            break;

        } else if(currentPlayer === playerYellow && !cells[i].classList.contains("redCell") && !cells[i].classList.contains("yellowCell"))
        {
            cells[i].style.backgroundColor = "yellow";
            cells[i].classList.add("yellowCell");
            currentPlayer = playerRed;
            break;
        }
        ;
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


