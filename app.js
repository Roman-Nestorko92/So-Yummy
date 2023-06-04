const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./src/routes/api/auth-routes");

const recipeRoutes = require("./src/routes/api/recipe-routes");

const popularRecipeRoutes = require("./src/routes/api/popularRecipe-routes");

const searchRoutes = require("./src/routes/api/search-routes");

const docRoutes = require("./src/routes/api/api-docs-routes");
const subsRoutes = require("./src/routes/api/subscription-routes");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.json("public"));

app.use("/api/auth", authRoutes);
app.use("/api/popular-recipe", popularRecipeRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/recipes", recipeRoutes);
// DOCUMENTATION

app.use("/api", docRoutes);

app.use("/api/auth", authRoutes);
app.use("/api", subsRoutes);

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
