const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./src/routes/api/auth-routes");
const docRoutes = require("./src/routes/api/api-docs-routes");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.json("public"));

// DOCUMENTATION

app.use("/api", docRoutes);

app.use("/api/auth", authRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Not found",
  });
});
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
