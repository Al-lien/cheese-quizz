require("dotenv").config();

const express = require("express");
const cors = require("cors");

// 👇 import basic routes patern
const questionRoutes = require("./src/routes/questionRoutes");
const userRoutes = require("./src/routes/userRoutes");
const cheeseRoutes = require("./src/routes/cheeseRoutes");

// 👇 express app
const app = express();

// 👇 middleware
app.use(
  cors({
    origin: "*",
  })
);
/* parses the JSON data and makes it available in req.body */
app.use(express.json());
/* console.log path and request type  */
app.use((req, res, next) => {
  console.info(req.path, req.method);
  next();
});

// 👇 routes
app.use("/api", questionRoutes);
app.use("/api", userRoutes);
app.use("/api", cheeseRoutes);

const PORT = process.env.PORT || 3001;

// 👇 listen for request
app.listen(PORT, () => {
  console.info("Listening on port", PORT);
});

module.exports = app;
