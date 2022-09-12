
let card = document.querySelector("#position0-0");
let cards = ["fa-dog","fa-cat","fa-hippo","fa-horse"]

function shuffleArray(array) {
    let curId = array.length;
    // There remain elements to shuffle
    while (0 !== curId) {
        // Pick a remaining element
        let randId = Math.floor(Math.random() * curId);
        curId -= 1;
        // Swap it with the current element.
        let tmp = array[curId];
        array[curId] = array[randId];
        array[randId] = tmp;
    }
    return array;
}
// Usage of shuffle
shuffleArray(cards);
console.log(cards);

card.addEventListener("click", function (e){
    card.innerHTML =
        `<i class="fa-solid ${shuffleArray(cards[0])}"></i>`
})

// FP TESTE
/*function getRandomList (list){
    let gameGrid = [];
    for (let i=0; i<list.length; i++) {
        let randomCard = Math.floor(Math.random()*list.length);
        console.log(randomCard)
        gameGrid[i] = list[randomCard]
    }
    return gameGrid;
}

console.log(getRandomList(cards))*/

/*CARDS
<i class="fa-solid fa-dog"></i>
<i class="fa-solid fa-cat"></i>
<i class="fa-light fa-hippo"></i>
<i class="fa-light fa-horse"></i>
<i class="fa-solid fa-fish"></i>
<i class="fa-solid fa-turtle"></i>
<i class="fa-light fa-whale"></i>
<i class="fa-light fa-bat"></i>
<i class="fa-solid fa-rabbit"></i>
<i class="fa-light fa-duck"></i>




Other animals https://fontawesome.com/icons/categories/animals
Other icons https://www.w3schools.com/icons/
 */