const db = require("../../db/client");

const table = "cheeses";

// GET ALL data ✅
const getAllCheeses = async (req, res, next) => {
  const sql = `SELECT * FROM ${table}`;

  try {
    const [results] = await db.promise().query(sql);
    res.json(results);
  } catch (error) {
    console.error("MySQL query error:", error);
    res.status(500).send({
      error: "Internal Server Error",
      message: "Failed to retrieve questions.",
    });
    next();
  }
};

// GET SINGLE data ✅
const getCheeseById = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  const sql = `SELECT * FROM ${table} WHERE id = ? `;

  try {
    const [results] = await db.promise().query(sql, [id]);

    if (results.length === 0) {
      res.status(404).send("Not Found");
    } else {
      res.json(results);
    }
  } catch (error) {
    console.error("MySQL query error:", error);
    res.status(500).send("Internal Server Error");
    next();
  }
};

module.exports = { getAllCheeses, getCheeseById };
