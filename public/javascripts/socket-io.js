const socket = io();
let randomNumber = Math.random();
socket.emit("hello-world", randomNumber);
socket.on("hello-world", data => {
    console.log(`User sent the number: ${data}`);
});
