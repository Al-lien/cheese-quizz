const request = require("supertest");
const app = require("../server");
const db = require("../db/client");

const {
  getAllUsers,
  getUserByEmail,
  getUserByEmailError,
} = require("./specs/users/getUsers");
const { postUser, postUserError } = require("./specs/users/postUser");

afterAll(() => db.end());

describe("GET /api/users", () => {
  it("should return all users", async () => {
    await getAllUsers(app, request);
  });
});

describe("GET /api/users/:email", () => {
  it("should return one user", async () => {
    await getUserByEmail(app, request);
  });

  it("should return no users", async () => {
    await getUserByEmailError(app, request);
  });
});

describe("POST /api/users", () => {
  it("should return created user", async () => {
    await postUser(app, request, db);
  });

  it("should return an error", async () => {
    await postUserError(app, request);
  });
});
