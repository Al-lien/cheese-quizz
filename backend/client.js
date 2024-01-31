const mysql = require("mysql2");

const client = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

client.getConnection((err, connection) => {
  if (err) {
    console.error("MySQL connection error:", err);
  } else {
    console.info(
      `Welcome ${process.env.USER_NAME}, you're now connected to your MySQL local database: ${process.env.DATABASE}`
    );
    connection.release();
  }
});

module.exports = client;
