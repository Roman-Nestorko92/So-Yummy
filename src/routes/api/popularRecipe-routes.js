const express = require("express");
const router = express.Router();
const { authentificate } = require("../../middleWares");
const popularRecipeControllers = require("../../controllers/popularrecipe-controllers");

router.get(
  "/popular-recipe",
  authentificate,
  popularRecipeControllers.getPopularRecipes
);

module.exports = router;
