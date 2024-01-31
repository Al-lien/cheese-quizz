const getAllUsers = async (app, request) => {
  const response = await request(app).get("/api/users");

  expect(response.headers["content-type"]).toMatch(/json/);
  expect(response.status).toEqual(200);
};

const getUserByEmail = async (app, request) => {
  const response = await request(app).get("/api/users/admin");

  expect(response.headers["content-type"]).toMatch(/json/);
  expect(response.status).toEqual(200);
};

const getUserByEmailError = async (app, request) => {
  const response = await request(app).get("/api/users/falseEmail");

  expect(response.status).toEqual(404);
};

module.exports = { getAllUsers, getUserByEmail, getUserByEmailError };
