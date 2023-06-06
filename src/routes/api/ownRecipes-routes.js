const express = require("express");
const router = express.Router();
const ownRecipesControllers = require("../../controllers/ownRecipes-controllers");
const { ownRecipesAddSchema } = require("../../models/ownRecipe");
const { validateBody } = require("../../utils");

const {
  authentificate,
  uploadRecipe,
  optimizeBody,
} = require("../../middleWares");

router.post(
  "/",
  authentificate,
  uploadRecipe.single("preview"),
  optimizeBody,
  validateBody(ownRecipesAddSchema),
  ownRecipesControllers.addOwnRecipe
);

router.get("/", authentificate, ownRecipesControllers.getOwnRecipes);

router.get(
  "/:ownRecipeId",
  authentificate,
  ownRecipesControllers.getOwnRecipeById
);

router.delete(
  "/:ownRecipeId",
  authentificate,
  ownRecipesControllers.deleteOwnRecipe
);

module.exports = router;
