let column = document.querySelector(".div-col");

//Create array of column cells and give them an initial state (eg black)
let newArray = [];
let id = "#";
for (let i = 0; i <= 5; i++) {
    newArray[i] = document.querySelector(id + "A" + i);
    newArray[i].style.backgroundColor = "black";
}
console.log(newArray);


//Create arrays for the grid:

let alphArray = ["A", "B", "C", "D", "E", "F", "G"];
let numArray = [ 0, 1, 2, 3, 4, 5];

let gridArrays = alphArray.map(function(letter){
    let arrayLetter = [];
    for(let i = 0; i < numArray.length; i++){
        arrayLetter[i] = letter + numArray[i];
    }
    console.log(arrayLetter);
    return arrayLetter;
})

console.log(gridArrays);

//on click color the last empty bottom cell of each column

let i = newArray.length - 1;
let currentEmpty = newArray[i];
let newEmpty;
let colorRed = "red";

function colorBottomCell(e) {
    if (currentEmpty.style.backgroundColor === colorRed) {
        newEmpty = newArray[i--];
        newEmpty.style.backgroundColor = colorRed;
        currentEmpty = newEmpty;
    } else {
        currentEmpty.style.backgroundColor = colorRed;
    }
}

column.addEventListener("click", colorBottomCell);
