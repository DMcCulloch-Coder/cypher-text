const express = require("express");
const db = require("../models");
const router = express.Router();

/* Player API Routes */
router.get("/api/players", (req, res) => {
    db.Players.findAll({
        include: [
            {
                model: db.Rooms
            }
        ]
    }).then(result => {
        res.json(result);
        // res.render("index", result);
    });
});

router.get("/api/players/:id", (req, res) => {
    db.Players.findAll({
        where: { id: req.params.id },
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

router.post("/api/players", (req, res) => {
    db.Players.create(req.body).then(result => {
        res.json(result);
        // res.render("index", result);
    });
});

router.put("/api/players/:id", (req, res) => {
    db.Players.update(req.body, { where: { id: req.params.id } }).then(
        result => {
            res.json(result);
            // res.render("index", result);
        }
    );
});

router.delete("/api/players/:id", (req, res) => {
    db.Players.destroy({ where: { id: req.params.id } }).then(result => {
        res.json(result);
        // res.render("index", result);
    });
});
module.exports = router;
