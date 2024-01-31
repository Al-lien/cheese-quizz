const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../../db/client");

const table = "users";

const SALT_ROUNDS = 10;
const TOKEN_EXPIRATION_TIME = "1d";

// GET ALL data ✅
const getAllUsers = async (req, res, next) => {
  const sql = `SELECT * FROM ${table}`;

  try {
    const [results] = await db.promise().query(sql);
    res.json({ data: results, message: "Users retrieved successfully" });
  } catch (error) {
    console.error("MySQL query error:", error);
    res.status(500).send({
      error: "Internal Server Error",
      message: "Failed to retrieve users.",
    });
    next();
  }
};

// GET SINGLE data with email ✅
const getUserByEmail = async (req, res) => {
  const { email } = req.params;
  const sql = `SELECT * FROM ${table} WHERE email = ?`;

  if (!validator.isEmail(email)) {
    res
      .status(400)
      .json({ error: "Bad Request", message: "Invalid email format" });
  }

  try {
    const [results] = await db.promise().query(sql, [email]);
    // try to check if email correct
    if (results.length === 0) {
      res.status(404).json({ error: "Not Found", message: "User not found" });
    } else {
      res
        .status(200)
        .json({ data: results, message: "User retrieved successfully" });
    }
  } catch (error) {
    console.error("MySQL query error:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to retrieve user by email",
    });
  }
};

// CREATE data ✅
const createUser = async (req, res) => {
  const { email, password } = req.body;
  const sql = `INSERT INTO ${table}(email, password) VALUES (?, ?)`;

  if (!validator.isEmail(email) || !validator.isStrongPassword(password)) {
    res.status(400).json({ message: "Invalid email or password" });
  }

  try {
    // check credentials

    // if ok, hashing password and creating user
    if (validator.isEmail(email) && validator.isStrongPassword(password)) {
      try {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hash = await bcrypt.hash(password, salt);

        const [result] = await db.promise().query(sql, [email, hash]);

        console.info("User creation result:", result);
        res.status(201).json({ id: result.insertId, message: "User created" });
      } catch (error) {
        console.error("Async operation error:", error);
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
          error: error.message,
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// DELETE data ✅
const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const sql = `DELETE FROM ${table} WHERE id = ?`;

  try {
    const [result] = await db.promise().query(sql, [id]);

    if (result.affectedRows > 0) {
      console.info("User deletion result:", result);
      res.status(204).send();
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("MySQL query error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT * FROM ${table} WHERE email = ?`;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const [results] = await db.promise().query(sql, [email]);
    console.info(results);

    if (results.length > 0) {
      const user = results[0];

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          process.env.SECRET_KEY,
          {
            expiresIn: TOKEN_EXPIRATION_TIME,
          }
        );
        res.status(201).json({
          success: true,
          id: user.id,
          token,
          message: "Login successful",
        });
      } else {
        res.status(401).json({ success: false, message: "Invalid password" });
      }
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("MySQL query error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  getAllUsers,
  getUserByEmail,
  createUser,
  deleteUser,
  loginUser,
};
