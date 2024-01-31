const getAllQuestions = async (app, request) => {
  const response = await request(app).get("/api/questions");

  expect(response.headers["content-type"]).toMatch(/json/);
  expect(response.status).toEqual(200);
};

const getQuestionById = async (app, request) => {
  const response = await request(app).get("/api/questions/1");

  expect(response.headers["content-type"]).toMatch(/json/);
  expect(response.status).toEqual(200);
};

const getQuestionByIdError = async (app, request) => {
  const response = await request(app).get("/api/questions/0");

  expect(response.status).toEqual(404);
};

module.exports = { getAllQuestions, getQuestionById, getQuestionByIdError };
