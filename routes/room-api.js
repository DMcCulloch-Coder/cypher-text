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
            clue: "testClueDisplay",
            room_name: result[0].room_name,
            room_access_code: result[0].room_access_code,
            scores: [0, 0],
            Words: []
        };
        req.params.player_type === "1"
            ? (data.player_type = 1)
            : (data.player_type = 0);

        for (i = 0; i < result[0].Words.length; i++) {
            let index = {
                id: i,
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

        if (data.scores.includes(0)){
            res.render("gameover");
        }

        // res.json(data);
        return res.render("room", data);
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

router.delete("/api/rooms/:id", (req, res) => {
    db.Rooms.destroy({ where: { id: req.params.id } }).then(result => {
        res.json(result);
        // res.render("index", result);
    });
});
module.exports = router;
