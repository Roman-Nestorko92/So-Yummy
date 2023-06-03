const express = require("express");
const controllers = require("../../controllers/recipe-controller");
// const { validateBody, isValidId, authenticate } = require("../../middlewares");
const {
  authentificate,
  isValidId,
  isValidCategory,
} = require("../../middleWares");
// const { schemas } = require("../../models/contact");
const router = express.Router();

router.get("/main-page", authentificate, controllers.getMainPageRecipe);

router.get("/:id", authentificate, isValidId, controllers.getRecipeById);

router.get(
  "/category/:category",
  authentificate,
  isValidCategory,
  controllers.getCategoryRecipe
);

module.exports = router;
