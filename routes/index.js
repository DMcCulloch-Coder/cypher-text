const express = require("express");
const router = express.Router();

//index.js will server as the html routes while the *-api will be the model specific api routes
router.get("/", (req, res, next) => {
	res.render("index", { title: "Cypher-Text" });
});

module.exports = router;
