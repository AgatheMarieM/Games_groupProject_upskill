let cellDiv = document.querySelector(".div-cell");

function getColored(event){
    cellDiv.style.backgroundColor = "red";
}
cellDiv.addEventListener("click", getColored);

console.log("hello");

