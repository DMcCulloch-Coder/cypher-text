const express = require("express");
const db = require("../models");
const router = express.Router();

router.get("/rooms/:id/:player_type?", (req, res) => {
    db.Rooms.findAll({
        where: { room_access_code: req.params.id },
        include: [
            {
                model: db.Words
            }
        ]
    }).then(result => {
        console.log(result);
        let data = {
            player_type: 0, //0/false = agent vs 1/true = keymaster
            current_clue: "",
            room_name: result[0].room_name,
            room_access_code: result[0].room_access_code,
            scores: [0, 0],
            Words: [],
            clues: ["testClueDisplay"]
        };
        req.params.player_type === "1"
            ? (data.player_type = 1)
            : (data.player_type = 0);

        let bomb;
        let x = (data.clues.length - 1);
        data.current_clue = data.clues[x];

        for (i = 0; i < result[0].Words.length; i++) {
            let index = {
                id: result[0].Words[i].id,
                word: result[0].Words[i].word,
                group_type: result[0].Words[i].group_type,
                visible: result[0].Words[i].visible,
                room_access_code: result[0].Words[i].room_access_code
            };

            if (
                !result[0].Words[i].visible &&
                result[0].Words[i].group_type === 1
            ) {
                data.scores[0]++;
            } else if (
                !result[0].Words[i].visible &&
                result[0].Words[i].group_type === 2
            ) {
                data.scores[1]++;
            }

            if (result[0].Words[i].group_type === 4) {
                bomb = i;
            }

            data.Words.push(index);
        }

        if (data.scores.includes(0) || data.Words[bomb].visible){
            let team = data.scores[0] < data.scores[1] ? true : false; // Winner: true = red & false = blue
            if(!res.headersSent) { // Keps us from getting the "http_outgoing.js:464 throw new ERR_HTTP_HEADERS_SENT('set');" Error
                res.redirect(`/${data.room_access_code}/gameover/${team}/${data.room_name}`);
            }
            res.redirect(`/${data.room_access_code}/gameover/${team}/${data.room_name}`);
        }

        res.render("room", data);
    });
});

/* Room API Routes */
router.get("/api/rooms", (req, res) => {
    db.Rooms.findAll({
        include: [
            {
                model: db.Words
            }
        ]
    }).then(result => {
        res.render("index", result);
    });
});

router.get("/api/rooms/:id", (req, res) => {
    db.Rooms.findAll({
        where: { room_access_code: req.params.id },
        include: [
            {
                model: db.Words
            }
        ]
    }).then(result => {
        let data = {
            room_access_code: result[0].room_access_code,
            scores: [0, 0],
            Words: []
        };
        for (i = 0; i < result[0].Words.length; i++) {
            let index = {
                id: result[0].Words[i].id,
                word: result[0].Words[i].word,
                group_type: result[0].Words[i].group_type,
                visible: result[0].Words[i].visible,
                room_access_code: result[0].Words[i].room_access_code
            };

            if (
                !result[0].Words[i].visible &&
                result[0].Words[i].group_type === 1
            ) {
                data.scores[0]++;
            } else if (
                !result[0].Words[i].visible &&
                result[0].Words[i].group_type === 2
            ) {
                data.scores[1] = data.scores[1] + 1;
            }

            data.Words.push(index);
        }

        // res.json(result[0]);
        return res.json(result);
    });
});

router.post("/api/rooms", (req, res) => {
    db.Rooms.create(req.body).then(result => {
        res.json(result);
        // res.render("index", result);
    });
});

router.put("/api/rooms/:id", (req, res) => {
    db.Rooms.update(req.body, { where: { id: req.params.id } }).then(result => {
        res.json(result);
        // res.render("index", result);
    });
});

//~~ Doesn'tt appear to be needed yet when rerouting to game over screen can delete room from the database instead? ~~//
router.delete("/api/rooms/:id", (req, res) => {
    db.Rooms.destroy({ where: { room_access_code: req.params.id } }).then(result => {
        res.json(result);
        // res.render("index", result);
    });
});

//====================== Game Over Screen ====================//
//============================================================//
router.get("/:id/gameover/:team/:room_name", (req, res) => {
    let data = {
        room_access_code: req.params.id,
        winner: req.params.team === "false" ? true : false,
        room_name: req.params.room_name
    };
    // res.json(data);

    db.Rooms.destroy({ where: { room_access_code: req.params.id } }).then(() => {
        // res.json(result);
        // res.render("index", result);
        res.render("gameover", data);
    });

    // deleteRoom(data.room_access_code);
});
//============================================================//

module.exports = router;
