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
function colorBottomCell(column) {
    console.log(column);
    let cells = column.querySelectorAll(".div-cell"); //creating array of cells
    console.log(cells);
    for(let i = 0; i<cells.length; i++) {
        if( i = cells.length - 1){
            cells[i].classList.add("player1");
            cells[i].style.backgroundColor = "yellow";
        }
    }

}

//gridArrays: we want to apply the eventListener to all columns (arrays) of the game
//loop through all the arrays from gridArrays
let gridArrays = document.querySelectorAll(".div-col"); //creating array of columns
for (let i = 0; i < gridArrays.length; i++) {
    gridArrays[i].addEventListener("click", colorBottomCell(gridArrays[i])) //adding event for each column of the array
    ;
}
;


//Create arrays for the grid:
/*
let alphArray = ["A", "B", "C", "D", "E", "F", "G"];
let numArray = [ 0, 1, 2, 3, 4, 5];

let gridArrays = alphArray.map(function(letter){
    let arrayLetter = [];
    for(let i = 0; i < numArray.length; i++){
        arrayLetter[i] = letter + numArray[i]; //populate the array
    }
    console.log(arrayLetter);
    return arrayLetter;
})
 */