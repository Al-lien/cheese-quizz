const getAllUsers = async (app, request) => {
  const response = await request(app).get("/api/users");

  expect(response.headers["content-type"]).toMatch(/json/);
  expect(response.status).toEqual(200);
};

const getUserByEmail = async (app, request) => {
  const response = await request(app).get(
    "/api/users/5d9e0292-b765-4c28-9c39-1dd35e792c9b@email.com"
  );

  expect(response.headers["content-type"]).toMatch(/json/);
  expect(response.status).toEqual(200);
};

const getUserByEmailError = async (app, request) => {
  const response = await request(app).get("/api/users/admin@admin.com");

  expect(response.status).toEqual(404);
};

module.exports = { getAllUsers, getUserByEmail, getUserByEmailError };
