const express = require("express");

const router = express.Router();
const {
  getAllUsers,
  createUser,
  getUserByEmail,
  deleteUser,
  loginUser,
} = require("../controllers/userControllers");

router.get("/users", getAllUsers);
router.get("/users/:email", getUserByEmail);
router.post("/users", createUser);
router.post("/users/login", loginUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
