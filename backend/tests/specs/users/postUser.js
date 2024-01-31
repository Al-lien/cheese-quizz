const crypto = require("node:crypto");

const postUser = async (app, request, db) => {
  const newUser = {
    email: `${crypto.randomUUID()}@email.com`,
    password: "dQ1FL;Gt+LP-zzX",
  };

  const response = await request(app).post("/api/users").send(newUser);

  expect(response.headers["content-type"]).toMatch(/json/);
  expect(response.status).toEqual(201);
  expect(response.body).toHaveProperty("id");
  expect(typeof response.body.id).toBe("number");

  const [result] = await db
    .promise()
    .query("SELECT * FROM users WHERE id = ?", response.body.id);

  const [userInDatabase] = result;
  expect(userInDatabase).toHaveProperty("id", "email", "password");

  const propertiesToCheck = ["email", "password"];

  propertiesToCheck.forEach((property) => {
    expect(userInDatabase[property]).toStrictEqual(newUser[property]);
  });
};

const postUserError = async (app, request) => {
  const userWithInvalidEmail = {
    email: "falseEmail",
    password: "dQ1FL;Gt+LP-zzX",
  };

  const userWithInvalidPassword = {
    email: `${crypto.randomUUID()}@email.com`,
    password: "abc",
  };

  const responseEmail = await request(app)
    .post("/api/questions")
    .send(userWithInvalidEmail);

  const responsePassword = await request(app)
    .post("/api/questions")
    .send(userWithInvalidPassword);

  expect(responseEmail.status).toEqual(500);
  expect(responsePassword.status).toEqual(500);
};

module.exports = { postUser, postUserError };
