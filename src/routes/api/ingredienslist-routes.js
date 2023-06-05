const express = require("express")
const router = express.Router()
const { authentificate, isValidId } = require("../../middleWares")
const ingredientListController = require("../../controllers/ingredientList-controller")

router.get(
  "/ingredients/list",
  authentificate,
  ingredientListController.getIngredientList
)

router.get(
  "/ingredients/:ingredientsId",
  isValidId,
  authentificate,
  ingredientListController.getIngredientSearch
)

module.exports = router
