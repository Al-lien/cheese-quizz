const express = require("express");

const router = express.Router();
const { getAllCheeses } = require("../controllers/cheeseControllers");

router.get("/cheeses", getAllCheeses);

module.exports = router;
