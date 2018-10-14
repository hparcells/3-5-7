var player = 1;
var marked = 0;
var selectedRow = undefined;
var win = false;

var playerLabel = document.getElementById("player");

const doneButton = document.getElementById("doneButton");
const statusLabel = document.getElementById("status");
const gameButton = document.getElementsByClassName("gameButton");

const greenColor = "#4CAF50";

var marks = [
    {isMarked: false},
    {isMarked: false},
    {isMarked: false},
    {isMarked: false},
    {isMarked: false},
    {isMarked: false},
    {isMarked: false},
    {isMarked: false},
    {isMarked: false},
    {isMarked: false},
    {isMarked: false},
    {isMarked: false},
    {isMarked: false},
    {isMarked: false},
    {isMarked: false},
];

function doLogic(className, idName) {
    var mark = document.getElementById(idName);
    
    classes = className.split(" ");
    var row = classes[1].substring(3);
    
    if(marks[parseInt(idName) - 1].isMarked) return;
    
    if(marked === 0) {
        selectedRow = row;  
        
        doneButton.style.backgroundColor = greenColor;
        doneButton.innerHTML = "Next Player";

        mark.classList.add("red");
        marks[parseInt(idName) - 1].isMarked = true;
        marked++;
    }else {
        if(row === selectedRow) {
            mark.classList.add("red");
            marks[parseInt(idName) - 1].isMarked = true;
            marked++;
        }
    }

    checkWin();
}

function endTurn() {
    if(!win) {
        if(marked > 0) {
            if(player === 1) {
                player = 2;

                playerLabel.innerHTML = "Player 2"
                playerLabel.style.color = "blue";
            }else {
                player = 1;

                playerLabel.innerHTML = "Player 1"
                playerLabel.style.color = "red";
            }
        
            marked = 0;

            doneButton.style.backgroundColor = "grey";
            doneButton.innerHTML = "You Must Mark At Least One Line"
        }
    }else {
        resetGame();
    }
}

function checkWin() {
    if(allMarks()) {
        var winningPlayer;

        if(player === 1) {
            winningPlayer = 2;

            statusLabel.style.color = "blue";
        }else {
            winningPlayer = 1;
            statusLabel.style.color = "red";
        }

        statusLabel.innerHTML = `Player ${winningPlayer} Wins!`;

        doneButton.style.backgroundColor = greenColor;
        doneButton.innerHTML = "Reset Game"

        win = true;

        return true;
    }

    return false;
}

function allMarks() {
    return marks[0].isMarked === true &&
            marks[1].isMarked === true &&
            marks[2].isMarked === true &&
            marks[3].isMarked === true &&
            marks[4].isMarked === true &&
            marks[5].isMarked === true &&
            marks[6].isMarked === true &&
            marks[7].isMarked === true &&
            marks[8].isMarked === true &&
            marks[9].isMarked === true &&
            marks[10].isMarked === true &&
            marks[11].isMarked === true &&
            marks[12].isMarked === true &&
            marks[13].isMarked === true &&
            marks[14].isMarked === true;
}

function resetGame() {
    player = 1;
    marked = 0;
    selectedRow = undefined;
    win = false;

    marks = [
        {isMarked: false},
        {isMarked: false},
        {isMarked: false},
        {isMarked: false},
        {isMarked: false},
        {isMarked: false},
        {isMarked: false},
        {isMarked: false},
        {isMarked: false},
        {isMarked: false},
        {isMarked: false},
        {isMarked: false},
        {isMarked: false},
        {isMarked: false},
        {isMarked: false},
    ];

    statusLabel.innerHTML = "Current Turn: <span id=\"player\">Player 1</span>";
    statusLabel.style.color = "black";

    playerLabel = document.getElementById("player");
    playerLabel.style.color = "red";
    playerLabel.innerHTML = `Player 1`;

    doneButton.style.backgroundColor = "grey";
    doneButton.innerHTML = "You Must Mark At Least One Line";

    for (var i = 0; i < gameButton.length; i++) {
        gameButton[i].classList.remove("red");
    }
}
