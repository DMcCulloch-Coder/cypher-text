const socket = io();

//Generates 5 character string for room id
function generateRoomID() {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZ";
    let string_length = 5;
    let id = "";
    for (let i = 0; i < string_length; i++) {
        let num = Math.floor(Math.random() * chars.length);
        id += chars.substring(num, num + 1);
    }
    return id;
}

//generates room ID and instructs client to join that room ID
let roomID = generateRoomID();
socket.emit("broadcast-room", roomID);
socket.on("joined-room", data => {
    console.log(`You have joined room ID: ${data}`);
});

//Once client initially connects we allow it to create a room and send that back to the server to setup
