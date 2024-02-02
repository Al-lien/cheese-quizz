const express = require("express");

const router = express.Router();
const {
  getAllCheeses,
  getCheeseById,
} = require("../controllers/cheeseControllers");

router.get("/search", getAllCheeses);
router.get("/search/:id", getCheeseById);

module.exports = router;
