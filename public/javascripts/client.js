$(document).ready(() => {
    const socket = io();

    //Will be used to decide whether or not to forward to room or game pages
    const previousRoom = JSON.parse(localStorage.getItem("roomID"));
    const currentRoom = window.location.pathname.split("/rooms/", 2)[1];

    const reJoinRoom = roomID => {
        socket.emit("broadcast-room", roomID);
    };

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
        return $.ajax({
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

    //Sends out broadcast to rejoin room to handle page redirection
    if (previousRoom === currentRoom) {
        reJoinRoom(previousRoom);
    } else if (currentRoom) {
        //handles case for testing where multiple tabs may be open to different rooms
        reJoinRoom(currentRoom);
    }

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
        const roomName = $("#room-input").val() || "The Most Awesome Room";
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

            $("#error-notice").addClass("collapse");
            $("#logo-div").addClass("collapse");
            $("#form-div").addClass("collapse");
            $("#creating-room").toggle();
        });
    });

    $("#join-room-input").on("click", event => {
        event.preventDefault();
        const roomID = $("#access-code-input").val();
        const url = `/rooms/${roomID}`;
        console.log(roomID);

        $.ajax({
            url: url,
            method: "GET",
            error: function(xhr, status, error) {
                let message;
                if (roomID) {
                    message = `Unable to join roomID: ${roomID}`;
                } else {
                    message = "You must enter a valid roomID";
                }
                $("#error-message").text(message);
                $("#error-notice").toggle();
                setTimeout(() => {
                    $("#error-notice").toggle();
                    $("#error-message").text("");
                }, 3000);
            }
        }).then(res => {
            socket.emit("broadcast-room", roomID);
            localStorage.setItem("roomID", JSON.stringify(roomID));
            location.replace(`/rooms/${roomID}`);
        });
    });
});

// new or returning user // user input?
//"/api/players/:name?"

// team choices
//"api/rooms/:id"

// keymaster choices
//"api/rooms/:id/players/:id?"

// submit clue
//"api/rooms/:id/pastclues/:team"

// submit guess
//api/rooms/:id/words/:id

// (^if) room does not exist reroute to create room

// teams' players for lists
//"api/rooms/:id/players"

// past clues
//"api/rooms/:id/pastclues"

// player_type
// api/rooms/:id/players /?/
