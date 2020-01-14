$(document).ready(() => {
    const socket = io();

    //Will be used to decide whether or not to forward to room or game pages
    const previousRoom = localStorage.getItem("roomID");

    //Generates 5 character string for room id
    const generateRoomID = () => {
        let chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZ";
        let string_length = 5;
        let id = "";
        for (let i = 0; i < string_length; i++) {
            let num = Math.floor(Math.random() * chars.length);
            id += chars.substring(num, num + 1);
        }
        return id;
    };
    //Sends message when new player joins
    socket.on("player-joined-room", msg => {
        console.log(msg);
    });
    //Sends message when joining a room
    socket.on("joined-room", data => {
        console.log(`You have joined room ID: ${data}`);
    });

    //Once client initially connects we allow it to create a room and send that back to the server to setup

    $.ajax({
        url: "/api/words",
        method: "GET"
    }).then(res => {
        console.log(res);
    });

    $("#create-room-input").on("click", event => {
        event.preventDefault();
        const url = "/api/rooms/";
        //Generate RoomID for socket.io channel
        const roomID = generateRoomID();
        const roomName = $("#room-input").val();
        const data = {
            room_name: roomName,
            room_access_code: roomID
        };
        //Create new room in SQL
        $.ajax({
            url: url,
            method: "POST",
            data: data
        }).then(res => {
            socket.emit("broadcast-room", roomID);
            localStorage.setItem("roomID", JSON.stringify(roomID));
            location.replace(`api/rooms/${roomID}`);
        });
        $("#room-input").val("");
    });

    $("#join-room-input").on("click", event => {
        event.preventDefault();
        const roomID = $("#access-code-input").val();
        const url = `/api/rooms/${roomID}`;
        console.log(roomID);

        $.ajax({
            url: url,
            method: "GET"
        })
            .then(res => {
                socket.emit("broadcast-room", roomID);
                localStorage.setItem("roomID", JSON.stringify(roomID));
                location.replace(`api/rooms/${roomID}`);
            });
    });
});

// new or returning user
//"/api/players/:name?"

// new or joining room
// //"api/rooms/:name?"
// $(document).ready(() => {
//     $("#join-room-input").on("click", () => {
//         event.preventDefault();
//         alert("JOIN");
//         // location.redirect("/api/rooms/1");
//         $.ajax({
//             url: "/api/rooms/1",
//             method: "GET"
//         }).then(() => {
//             // res.render("room", result);
//             alert("AJAX");
//         });
//     });
// });

//place holder for ajax api requests
//------ Inputs -----
// new or returning user
//"/api/players/:name?"
// new or joining room
//"api/rooms/:name?"
// team choices
//"api/rooms/:id"
// keymaster choices
//"api/rooms/:id/players/:id?"
// submit clue
//"api/rooms/:id/pastclues/:team"
// submit guess
//api/rooms/:id/words/:id

// keymaster choices
//"api/rooms/:id/players/:id?"

// submit clue
//"api/rooms/:id/pastclues/:team"

// submit guess
//api/rooms/:id/words/:id

// ----- Find (^nest?) -------
// (^if) returning user
// (^if) room does not exist reroute to create room
// words (render and on click functonality)
// teams' players for lists
//"api/rooms/:id/players"
// past clues
//"api/rooms/:id/pastclues"
// player_type
// api/rooms/:id/players /?/
// scores = not-visible.length?
//"api/rooms/:id/words"

// past clues
//"api/rooms/:id/pastclues"

// player_type
// api/rooms/:id/players /?/

// scores = not-visible.length?
//"api/rooms/:id/words"
