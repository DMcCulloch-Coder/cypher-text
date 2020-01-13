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
    }).then((result) => {//
        console.log("====================\n\n\n api-connectin? \n\n\n===============");
        // res.json(result[0]);
        res.render("room", result[0]);
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
