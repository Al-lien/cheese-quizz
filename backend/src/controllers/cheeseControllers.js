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

module.exports = { getAllCheeses };
