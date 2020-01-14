$(document).ready(() => {

    $.ajax({
        url: "/api/words",
        method: "GET"
    }).then((res) => {
        console.log(res);
    });

    $("#create-room-input").on("click", (event) => {
        alert("working -create room");
        console.log(event);
    });

    $("#join-room-input").on("click", (event) => {
        event.preventDefault();
        const id = $("#room-input").val();
        const url = `/api/rooms/${id}`;
        console.log(id);

        $.ajax({
            url: url,
            method: "GET"
        }).then((res) => {
            location.replace(`api/rooms/${id}`);
            console.log(res);
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
