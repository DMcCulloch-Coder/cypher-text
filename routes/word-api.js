const express = require("express");
const db = require("../models");
const router = express.Router();

/* Word API Routes */
router.get("/api/words", (req, res, next) => {
	db.Words.findAll({}).then(result => {
		res.json(result);
		// res.render("index", result);
	});
});

router.get("/api/words/:id", (req, res, next) => {
	db.Words.findAll({ where: { id: req.params.id } }).then(result => {
		res.json(result);
		// res.render("index", result);
	});
});

router.post("/api/words", (req, res, next) => {
	db.Words.create(req.body).then(result => {
		res.json(result);
		// res.render("index", result);
	});
});

router.put("/api/words/:id", (req, res, next) => {
	db.Words.update(req.body, { where: { id: req.params.id } }).then(result => {
		res.json(result);
		// res.render("index", result);
	});
});

router.delete("/api/words/:id", (req, res, next) => {
	db.Words.destroy({ where: { id: req.params.id } }).then(result => {
		res.json(result);
		// res.render("index", result);
	});
});
module.exports = router;
