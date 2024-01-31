const jwt = require("jsonwebtoken");
const db = require("../../db/client");

const table = "users";

async function requireAuth(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }
  // geting only the token not the Bearer
  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    // user is verify and get only the id not all the data
    const sql = `SELECT * FROM ${table} WHERE id = ?`;
    req.userVerified = await db.promise().query(sql, [id]);
    next();
  } catch (error) {
    return res.status(401).json({ error: "Request is not authorized" });
  }
  return null;
}

module.exports = { requireAuth };
