// Target and load landing page WITHOUT the game
let landingPage = document.querySelector(".lp-4inline");
let gamePage = document.querySelector(".game-4inline");
gamePage.style.display = 'none';

//Target player names from initial inputs (then we'll show them on game page):
let playerRedName = document.querySelector("#playerRedName");
let playerYellowName = document.querySelector("#playerYellowName");

//Target boxes that will display the current players' names
let boxPlayerRed = document.querySelector("#name-playerRed");
let boxPlayerYellow = document.querySelector("#name-playerYellow");

//EventListeners: when we fill player names, they are displayed in their respective boxes
playerRedName.addEventListener("input", function (e) {
    boxPlayerRed.innerHTML = e.target.value;
})
playerYellowName.addEventListener("input", function (e) {
    boxPlayerYellow.innerHTML = e.target.value;
})

//EventListener: on clicking start button, the landing-page disappears and the game is on display
//startButton also starts the stopwatch(timer)!
let startButton = document.querySelector("#start-button");
let timerElement = document.querySelector("#timer");
let interval = null;
let [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];

startButton.addEventListener("click", function startPlaying() {
    landingPage.style.display = 'none'; //landing-page now hidden
    gamePage.style.display = "block";
    interval = setInterval(updateTimer, 1000);//the delay is set to 1000 ms (1sc)
    function updateTimer() {
        milliseconds += 1000;
        if (milliseconds === 1000) {
            milliseconds = 0;
            seconds++;
            /*if (seconds < 10) {
                seconds = '0' + seconds;*/
            if (seconds === 60) {
                seconds = 0;
                minutes++;
                if (minutes === 60) {
                    minutes = 0;
                    hours++;
                    // }
                }
            }
        }

        timerElement.innerHTML = `${hours}:${minutes}:${seconds}`;
    }
});

// Targeting div that shows the current player names. It will hide when there is a winner
let playerNames = document.querySelector(".current-players");

// Targeting div that shows the winner name. It will pop up when there is a winner
let winnerName = document.querySelector(".winner-name");
winnerName.style.display = 'none';


//Initializing the game: each player has a string associated to them
//Then this string will help us create a class for each red or yellow cell
let playerRed = "redCell";
let playerYellow = "yellowCell";

//Initializing CurrentPlayer (will play first) by a random number:
let currentPlayer;
let randomNumber = Math.random() * 10;
if (randomNumber < 5) {
    currentPlayer = playerRed;
    boxPlayerRed.style.backgroundColor = "red";
} else {
    currentPlayer = playerYellow;
    boxPlayerYellow.style.backgroundColor = "yellow";
}

//Interacting with the DOM: columnList stores all columns from document
let columnList = document.querySelectorAll(".div-col");//(array with 7 columns)

//EventListener: for each column, calling colorCells() function, passing the column as argument
columnList.forEach(function (column) {
    column.addEventListener("click", function () {
        colorCells(column)
    });
    //anonymous function needed to prevent the default behavior;
})


//Interacting with the DOM: colCellsList will store all cells from each column from columnList
//allows us to access later the state of each cell (contains red or yellow?)
let colCellsList = [];
for (let j = 0; j < columnList.length; j++) {
    colCellsList[j] = columnList[j].querySelectorAll(".div-cell");
}

let counter = 0;
let gameOver = false;

function colorCells(column) {
    //if the game is over already, impossible to fill any cell:
    if(gameOver){
        return;
    }

    //creating locally an array of cells for the column from columnList that is being iterated:
    let cells = column.querySelectorAll(".div-cell");

    /* reading the column from bottom to top: if the last index of the cells array doesn't contain a class
    with player color, then we add it: playerRed or playerYellow */
    for (let i = cells.length - 1; i >= 0; i--) {
        if (!cells[i].classList.contains(playerRed) && !cells[i].classList.contains(playerYellow)) {
            cells[i].classList.add(currentPlayer);
            counter++;
            //each time we fill a cell it also receives a new attribute:
            cells[i].setAttribute("player_color", currentPlayer);

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
    getWinner(); //getWinner called to see if there is a 4 in line

}


function getWinner() {
    let rowsLength = 6; // creating a variable for rows, to iterate through them easily
    //The attribute "player_color" that was set at colorCells() allows us to compare the cells:

    //Vertical four in line
    for (let i = 0; i < colCellsList.length; i++) { // 7 columns in colCellsList, i goes until 6
        for (let j = 0; j < colCellsList[i].length - 3; j++) { // each column has 6 elements, j goes to 5
            if (colCellsList[i][j].getAttribute('player_color') !== null) {
                if (colCellsList[i][j].getAttribute('player_color') === colCellsList[i][j + 1].getAttribute('player_color')
                    && colCellsList[i][j + 1].getAttribute('player_color') === colCellsList[i][j + 2].getAttribute('player_color')
                    && colCellsList[i][j + 2].getAttribute('player_color') === colCellsList[i][j + 3].getAttribute('player_color')) {
                    displayWinnerName(colCellsList[i][j].getAttribute('player_color'));
                    gameOver = true;
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
                    gameOver = true;
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
                    gameOver = true;
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
                    gameOver = true;
                    return;
                }
            }
        }
    }

    //No winner situation: if gameOver wasn't set to true && and all cells filled (counter = 42), the game stops
    if (!gameOver && counter === 42) {
        displayWinnerName("");
    }
}


//Create scores array in LocalStorage
let scores = JSON.parse(localStorage.getItem("scores"));
if (!scores) {
    scores = [];
}

//function displayWinnerName() tasks:
// display winner name,
// hide current player names,
// go back to Menu or Play Again,
// store date+time of victory+winner name in LocalStorage.
// It receives a cell as a parameter, that contains an attribute with the winning color
function displayWinnerName(cell) {
    let nameWinner;
    winnerName.style.display = 'flex';
    playerNames.style.display = 'none';
    let dateVictory = formatDate(new Date());
    let timeVictory = formatTime(new Date());

    if (cell === 'redCell') {
        nameWinner = boxPlayerRed.innerHTML;
    } else {
        nameWinner = boxPlayerYellow.innerHTML;
    }
    //Ideally would be a pop-up window:
    winnerName.innerHTML = `<div>
                                    ${nameWinner} wins! 
                                </div> 
                                <a href="../index.html">
                                    Menu
                                </a>   
                                <a href="four_in_a_line.html">
                                    Play again?
                                </a>                           
                                `;


    if(cell === "") {
        nameWinner = `No winner, 0-0`;
        winnerName.innerHTML = `<div>
                                   You're too smart!
                                </div> 
                                <a href="../index.html">
                                    Menu
                                </a>   
                                <a href="four_in_a_line.html">
                                    Play again?
                                </a>                           
                                `;
    }

    //pushing data from the last game into the scores array:
        let newScore =
            {
                "date": dateVictory,
                "time": timeVictory,
                "winner": nameWinner
            }
        ;
    scores.push(newScore);
    localStorage.setItem("scores", JSON.stringify(scores)); }


//formatDate() receives new Date() of victory and format it to show only day/month/year
function formatDate(date) {
    let dayOfMonth = date.getDate();
    if (dayOfMonth < 10) {
        dayOfMonth = '0' + dayOfMonth;
    }
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }
    let year = date.getFullYear();
    return `${dayOfMonth}/${month}/${year}`;

}

//formatTime() receives new Date() of victory and format it to show only time: hours and minutes
function formatTime(time) {
    let hour = time.getHours();
    if (hour < 10) {
        hour = '0' + hour;
    }
    let minutes = time.getMinutes();
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    return `${hour}h${minutes}`;
}
