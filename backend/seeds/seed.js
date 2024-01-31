require("dotenv").config({ path: "../.env" });

const fs = require("node:fs");
const mysql = require("mysql2/promise");

const { HOST, USER_NAME, PASSWORD, DATABASE } = process.env;

const questions = fs.readFileSync("./questions.sql", "utf8");
const choices = fs.readFileSync("./choices.sql", "utf8");
const users = fs.readFileSync("./users.sql", "utf8");

const pool = mysql.createPool({
  host: HOST,
  user: USER_NAME,
  password: PASSWORD,
  database: DATABASE,
  multipleStatements: true,
});

const seeds = async () => {
  const db = await pool.getConnection();
  try {
    // adding datas into previously created tables
    await db.query(questions);
    await db.query(choices);
    await db.query(users);

    console.info(`${DATABASE} updated 🆙`);
  } catch (err) {
    console.error("Error updating the database:", err.message);
  } finally {
    db.release();
  }
};

seeds();
