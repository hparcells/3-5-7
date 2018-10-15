var socket;

var serverIP = document.getElementById("serverIP");
var serverPort = document.getElementById("serverPort");
var username = document.getElementById("username");

var serverStatus = document.getElementById("serverStatus");
var connectButton = document.getElementById("connectButton");
var disconnectButton = document.getElementById("disconnectButton");
var serverPanel = document.getElementById("serverPanel");

var users = [];

function connectToServer() {
    console.log(`Connecting ${username.value} to http://${serverIP.value}:${serverPort.value}...`);
    socket = io(`http://${serverIP.value}:${serverPort.value}`);

    serverStatus.innerHTML = "Connecting..."
    serverStatus.style.color = "yellow";
    

    socket.on('connect', function(){
        serverStatus.innerHTML = "Connected";
        serverStatus.style.color = "green";

        console.log(`Connected ${username.value} to http://${serverIP.value}:${serverPort.value}.`);

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

        console.log(`Disconnected ${username.value} to http://${serverIP.value}:${serverPort.value}.`);
    });

    socket.on("playerUpdate", function(data){
        users = data;
        
        if(users.length <= 2) {
            console.log(users);
        }else if(users.length > 2 && username.value === users[2]){
            socket.emit("playerDisconnect", username.value);
            
            socket.close();
        }
    });
    
    socket.on("lostPlayer", function(data){

    });

    socket.on("updatedMark", function(data){

    });

    socket.on("switchTurns", function(data){

    });

    socket.on("win", function(data){

    });
}

function disconnectFromServer() {
    socket.emit("playerDisconnect", username.value);
    socket.close();
}
