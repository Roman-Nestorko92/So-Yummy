const express = require("express");
const controllers = require("../../controllers/recipe-controller");
const categoryControllers = require("../../controllers/category-controllers");
const {
  authentificate,
  isValidId,
  isValidCategory,
  isValidIdRecipe,
} = require("../../middleWares");

const router = express.Router();

router.get(
  "/category-list",
  authentificate,
  categoryControllers.getListCategory
);

router.get("/main-page", authentificate, controllers.getMainPageRecipe);

router.get(
  "/:id",
  authentificate,
  isValidId,
  isValidIdRecipe,
  controllers.getRecipeById
);

router.get(
  "/category/:category",
  authentificate,
  isValidCategory,
  controllers.getCategoryRecipe
);

module.exports = router;
