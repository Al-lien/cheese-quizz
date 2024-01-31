const express = require("express");

const router = express.Router();
const {
  getAllQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/questionControllers");

router.get("/questions", getAllQuestions);
router.get("/questions/:id", getQuestionById);
router.post("/questions", createQuestion);
router.patch("/questions/:id", updateQuestion);
router.delete("/questions/:id", deleteQuestion);

module.exports = router;
