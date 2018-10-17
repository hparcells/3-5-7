var socket;

var serverIP = document.getElementById("serverIP");
var serverPort = document.getElementById("serverPort");
var username = document.getElementById("username");

var serverStatus = document.getElementById("serverStatus");
var connectButton = document.getElementById("connectButton");
var disconnectButton = document.getElementById("disconnectButton");
var serverPanel = document.getElementById("serverPanel");
var game = document.getElementById("game");

var users = [];
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

var player = 1;
var marked = 0;
var selectedRow = undefined;
var win = false;

const greenColor = "#4CAF50";

var playerLabel = document.getElementById("player");

const doneButton = document.getElementById("doneButton");
const statusLabel = document.getElementById("status");
const gameButton = document.getElementsByClassName("gameButton");

function connectToServer() {
    console.log(`Connecting ${username.value} to ${location.protocol}//${serverIP.value}:${serverPort.value}...`);
    
    socket = io.connect(`${location.protocol}//${serverIP.value}:${serverPort.value}`);

    serverStatus.innerHTML = "Connecting..."
    serverStatus.style.color = "yellow";
    

    socket.on('connect', function(){
        serverStatus.innerHTML = "Connected";
        serverStatus.style.color = "green";

        console.log(`Connected ${username.value} to ${location.protocol}//${serverIP.value}:${serverPort.value}.`);

        serverPanel.style.display = "none";

        connectButton.disabled = true;
        disconnectButton.disabled = false;

        socket.emit("newPlayer", username.value);
    });
    
    socket.on('disconnect', function(){
        serverStatus.innerHTML = "Disconnected";
        serverStatus.style.color = "red";

        connectButton.disabled = false;
        disconnectButton.disabled = true;

        serverPanel.style.display = "block";
        game.classList.add("hidden");

        console.log(`Disconnected ${username.value} to http://${serverIP.value}:${serverPort.value}.`);
    });

    socket.on("playerUpdate", function(data){
        users = data;
        
        if(users.length <= 2) {
            if(users.length === 2) {
                game.classList.remove("hidden");

                playerLabel.innerHTML = users[0];

                if(isMyTurn()) {
                    doneButton.style.backgroundColor = "grey";
                    doneButton.innerHTML = "You Must Mark At Least One Line";
                }else {
                    doneButton.style.backgroundColor = "grey";
                    doneButton.innerHTML = "Wait for Your Opponent";
                }
            }else {
                game.classList.add("hidden");
            }

            console.log(users);
        }else if(users.length > 2 && username.value === users[2]){
            socket.emit("playerDisconnect", username.value);
            
            socket.close();
        }
    });

    socket.on("markUpdate", function(className, idName){
        var mark = document.getElementById(idName);
        var classes = className.split(" ");
        var row = classes[1].substring(3);

        if(marks[parseInt(idName) - 1].isMarked) return;
            if(marked === 0) {
                selectedRow = row;

                if(isMyTurn()) {
                    doneButton.style.backgroundColor = greenColor;
                    doneButton.innerHTML = "Next Player";
                }
                
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
    });

    socket.on("turnUpdate", function(data) {
        player = data;
        marked = 0;

        if(player === 1) {
            playerLabel.style.color = "red";
        }else {
            playerLabel.style.color = "blue";
        }

        playerLabel.innerHTML = users[data - 1];

        console.log(`Switching to Player ${data}.`);

        if(isMyTurn()) {
            doneButton.style.backgroundColor = "grey";
            doneButton.innerHTML = "You Must Mark At Least One Line";
        }else {
            doneButton.style.backgroundColor = "grey";
            doneButton.innerHTML = "Wait for Your Opponent";
        }
    })

    socket.on("win", function(data){

    });
}

function disconnectFromServer() {
    socket.emit("playerDisconnect", username.value);
    socket.close();
}

function doLogic(className, idName) {
    if(isMyTurn()) {
        socket.emit("updatedMark", className, idName);
    }
}

function endTurn() {
    if(!win) {
        if(isMyTurn() && marked > 0) {
            socket.emit("switchTurns", player);   
        }
    }else {
        // TODO: Win Stuff
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

        statusLabel.innerHTML = `Player ${users[winningPlayer - 1]} Wins!`;

        doneButton.style.backgroundColor = greenColor;
        doneButton.innerHTML = "Reset Game"

        win = true;
    }
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

function isMyTurn() {
    return users[player - 1] === username.value;
}
