const postQuestion = async (app, request, db) => {
  const newQuestions = {
    userId: 0,
    question: "What the meaning of life ?",
    answer: "I don't know ...",
    details: "What's funny is that ... OH MY GOD!",
    choice1: "To die",
    choice2: "To die painfully",
    choice3: "To die, but nicely this time",
    choice4: "To die twice",
  };

  const response = await request(app).post("/api/questions").send(newQuestions);
  expect(response.status).toEqual(200);
  expect(response.body).toHaveProperty("id");

  const [result] = await db
    .promise()
    .query(
      "SELECT * FROM questions INNER JOIN choices ON questions.id=choices.questionId WHERE questions.id = ? ",
      response.body.id
    );

  const [questionInDatabase] = result;
  expect(questionInDatabase).toHaveProperty(
    "id",
    "userId",
    "question",
    "answer",
    "details",
    "questionId",
    "choice1",
    "choice2",
    "choice3",
    "choice4"
  );
  expect(questionInDatabase.id).toEqual(questionInDatabase.questionId);

  const propertiesToCheck = [
    "userId",
    "question",
    "answer",
    "details",
    "choice1",
    "choice2",
    "choice3",
    "choice4",
  ];

  propertiesToCheck.forEach((property) => {
    expect(questionInDatabase[property]).toStrictEqual(newQuestions[property]);
  });
};

const postQuestionError = async (app, request) => {
  const questionWithMissingProps = {
    question: "Could you end all this suffering ?",
  };

  const response = await request(app)
    .post("/api/questions")
    .send(questionWithMissingProps);

  expect(response.status).toEqual(500);
};
module.exports = { postQuestion, postQuestionError };
