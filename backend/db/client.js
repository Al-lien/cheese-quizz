const mysql = require("mysql2");

const client = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

client.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
  } else {
    console.info(
      `Welcome ${process.env.USER_NAME}, you're now connected to your MySQL local dabatase: ${process.env.DATABASE}`
    );
  }
});

module.exports = client;
