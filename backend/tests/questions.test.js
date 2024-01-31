const request = require("supertest");
const app = require("../server");
const db = require("../db/client");

const {
  getAllQuestions,
  getQuestionById,
  getQuestionByIdError,
} = require("./specs/questions/getQuestions");
const {
  postQuestion,
  postQuestionError,
} = require("./specs/questions/postQuestion");

afterAll(() => db.end());

describe("GET /api/questions", () => {
  it("should return all questions", async () => {
    await getAllQuestions(app, request);
  });
});

describe("GET /api/questions/:id", () => {
  it("should return one question", async () => {
    await getQuestionById(app, request);
  });

  it("should return no question", async () => {
    await getQuestionByIdError(app, request);
  });
});

describe("POST /api/questions", () => {
  it("should return created questions", async () => {
    await postQuestion(app, request, db);
  });

  it("should return an error", async () => {
    await postQuestionError(app, request);
  });
});
