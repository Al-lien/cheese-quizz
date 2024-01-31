const db = require("../../db/client");

const table = "questions";
const dependencyTable = "choices";

// GET ALL data ✅
const getAllQuestions = async (req, res, next) => {
  const sql = `SELECT * FROM ${table} INNER JOIN ${dependencyTable} ON ${table}.id=${dependencyTable}.questionId `;

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
const getQuestionById = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  const sql = `SELECT * FROM ${table} INNER JOIN ${dependencyTable} ON ${table}.id=${dependencyTable}.questionId WHERE ${table}.id = ? `;

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

// CREATE data ✅
const createQuestion = async (req, res, next) => {
  const {
    userId,
    question,
    answer,
    details,
    choice1,
    choice2,
    choice3,
    choice4,
  } = req.body;

  const sqlQuestions = `INSERT INTO ${table} ( userId, question, answer, details) VALUES (?, ?, ?, ?)`;
  const sqlChoices = `INSERT INTO ${dependencyTable} (questionId, choice1, choice2, choice3, choice4) VALUES (?, ?, ?, ?, ?)`;

  try {
    const [resultQuestions] = await db
      .promise()
      .query(sqlQuestions, [userId, question, answer, details]);

    const newQuestionId = resultQuestions.insertId;

    await db
      .promise()
      .query(sqlChoices, [newQuestionId, choice1, choice2, choice3, choice4]);

    res.status(201).send({
      id: resultQuestions.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
    next();
  }
};

// UPDATE data ✅
const updateQuestion = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const { question, answer, details, choice1, choice2, choice3, choice4 } =
    req.body;

  const sqlQuestions = `UPDATE ${table} SET question = ?, answer = ?, details = ? WHERE id = ?`;
  const sqlChoices = `UPDATE ${dependencyTable} SET choice1 = ?, choice2 = ?, choice3 = ?, choice4 = ? WHERE questionId = ?`;

  try {
    const [result] = await db
      .promise()
      .query(sqlQuestions, [question, answer, details, id]);

    const questionId = id;

    const [result2] = await db
      .promise()
      .query(sqlChoices, [choice1, choice2, choice3, choice4, questionId]);

    if (result.affectedRows > 0 && result2.affectedRows > 0) {
      res.status(200).send({ message: "Questions updated" });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
    next();
  }
};

// DELETE data ✅
const deleteQuestion = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const sqlChoices = `DELETE FROM ${dependencyTable} WHERE questionId = ?`;
  const sqlQuestions = `DELETE FROM ${table} WHERE id = ?`;

  try {
    const [result] = await db.promise().query(sqlChoices, [id]);
    const [result2] = await db.promise().query(sqlQuestions, [id]);

    if (result.affectedRows > 0 && result2.affectedRows > 0) {
      res.status(201).send({ message: "Question deleted" });
    } else {
      res.status(404).send({ message: "Not Found" });
    }
  } catch (error) {
    console.error("MySQL query error:", error);
    res.status(500).send("Internal Server Error");
    next();
  }
};

module.exports = {
  getAllQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};
