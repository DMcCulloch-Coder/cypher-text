const express = require("express");
const db = require("../models");
const router = express.Router();

/* Room API Routes */
router.get("/api/rooms", (req, res) => {
    console.log(1);
    db.Rooms.findAll({
        include: [
            {
                model: db.Words
            }
        ]
    }).then(result => {
        res.json(result);
        // res.render("index", result);
    });
});

router.get("/api/rooms/:id", (req, res) => {
    db.Rooms.findAll({
        where: { id: req.params.id },
        include: [
            {
                model: db.Words
            }
        ]
    }).then(result => {

        let data = {
            id: result[0].id,
            Words: []
        };
        for (i = 0; i < result[0].Words.length; i++) {
            let index = {
                word: result[0].Words[i].word,
                group_type: result[0].Words[i].group_type,
                id: result[0].Words[i].id
            };
            data.Words.push(index);
        }

        // res.json(result[0]);
        return res.render("room", data);
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
