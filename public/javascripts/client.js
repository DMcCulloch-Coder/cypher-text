$(document).ready(() => {
    const socket = io();

    //Will be used to decide whether or not to forward to room or game pages
    const previousRoom = localStorage.getItem("roomID");

    //Generates 5 character string for room id
    const generateRoomID = () => {
        let chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZ";
        let id = "";
        let string_length = 5;
        for (let i = 0; i < string_length; i++) {
            let num = Math.floor(Math.random() * chars.length);
            id += chars.substring(num, num + 1);
        }
        return id;
    };

    const generateWordList = roomID => {
        const roomURL = `/api/rooms/${roomID}`;
        //Get room from DB so we can grab id to reset room
        $.ajax({
            url: roomURL,
            method: "GET"
        }).then(res => {
            const wordURL = `/api/rooms/words/${res[0].id}`;
            let id = res[0].id;
            //Delete all WORDs in the DB and Add in 25 more
            $.ajax({
                url: wordURL,
                method: "DELETE"
            }).then(res => {
                console.log(`Deleted ${res} words for roomID ${roomID}`);
                const newWordURL = "/api/words/";
                //Get room from DB so we can grab id to reset room
                console.log(id);
                $.ajax({
                    url: newWordURL,
                    method: "POST",
                    data: {
                        id: id
                    }
                }).then(res => {
                    res;
                });
            });
        });
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
        const url = "api/rooms";
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
            generateWordList(roomID);
            setTimeout(() => {
                location.replace(`/rooms/${roomID}`);
            }, 3000);
        });
        $("#room-input").val("");
    });

    $("#join-room-input").on("click", event => {
        event.preventDefault();
        const roomID = $("#access-code-input").val();
        const url = `/rooms/${roomID}`;
        console.log(roomID);

        $.ajax({
            url: url,
            method: "GET"
        }).then(res => {
            socket.emit("broadcast-room", roomID);
            localStorage.setItem("roomID", JSON.stringify(roomID));
            location.replace(`/rooms/${roomID}`);
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
