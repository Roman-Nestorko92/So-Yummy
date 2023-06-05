const express = require("express");
const router = express.Router();
const { authentificate, isValidId } = require("../../middleWares");
const ingredientListController = require("../../controllers/ingredientList-controller");
const { optimizeBody } = require("../../middleWares");

router.get(
  "/ingredients/list",
  authentificate,
  ingredientListController.getIngredientList
);

router.get(
  "/ingredients",
  // isValidId,
  authentificate,
  optimizeBody,
  ingredientListController.getIngredientSearch
);

module.exports = router;
