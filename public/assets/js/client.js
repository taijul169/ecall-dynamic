// creating function for sending message to server
var socket = io("http://localhost:5000");

socket.on('connection');

const sendMessage = ()=>{
    var name = document.getElementById("docBookFname").value;
    socket.emit('message', name)
}


