const express = require("express");
const db = require("../models");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const filePath = path.join(
    __dirname,
    "..",
    "public",
    "data",
    "cypher_text_default_dictionary.txt"
);

/* Word API Routes */
router.get("/api/words", (req, res) => {
    db.Words.findAll({}).then(result => {
        res.json(result);
        // res.render("index", result);
    });
});

router.get("/api/words/:id", (req, res) => {
    db.Words.findAll({ where: { id: req.params.id } }).then(result => {
        res.json(result);
        // res.render("index", result);
    });
});

router.post("/api/words", (req, res) => {
    let array = fs
        .readFileSync(filePath, "utf8")
        .toString()
        .split("\n");
    //grab 25 new words at random and insert them into the db associated with the roomID
    const shuffleArray = array.sort(() => 0.5 - Math.random());
    const randomWords = shuffleArray.slice(0, 25);
    let wordArray = [];
    let groupType;
    console.log(req.body);
    for (i in randomWords) {
        console.log(randomWords[i]);
        switch (i) {
            case "0": // first one is black card
                groupType = 4;
                break;
            case "1": // everything after one is blue card
                groupType = 1;
                break;
            case "10": // first 9 is red card
                groupType = 2;
                break;
            case "19": // everything after 17 is neutral card
                groupType = 3;
                break;
            default:
            //do nothing
        }
        console.log(req.body);
        wordArray.push({
            word: randomWords[i],
            room_id: req.body.id,
            visible: 0,
            group_type: groupType
        });
    }
    //bulk create the new words
    db.Words.bulkCreate(wordArray).then(result => {
        res.json(result);
        // res.render("index", result);
    });
});

router.put("/api/words/:id", (req, res) => {
    db.Words.update(req.body, { where: { id: req.params.id } }).then(result => {
        res.json(result);
        // res.render("index", result);
    });
});

router.delete("/api/words/:id", (req, res) => {
    db.Words.destroy({ where: { id: req.params.id } }).then(result => {
        res.json(result);
        // res.render("index", result);
    });
});

router.delete("/api/rooms/words/:room_id", (req, res) => {
    db.Words.destroy({ where: { room_id: req.params.room_id } }).then(
        result => {
            res.json(result);
            // res.render("index", result);
        }
    );
});
module.exports = router;
