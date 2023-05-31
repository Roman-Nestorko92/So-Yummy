const express = require("express")
const recipeControllers = require("../../controllers/recipe-controller")
const router = express.Router()

router.get("/", recipeControllers.getAllRecipe)
router.post("/subscribe")
router.get("/recipes/category-list")
router.get("/recipes/main-page")
router.post("/recipes/:category")
router.get("/recipes/:id")
router.post("/search")
router.patch("/ingredients/list")
router.patch("/ingredients")
router.patch("/ownRecipes")
router.patch("/favorite")
router.patch("/popular-recipe")
router.patch("/shopping-list")
module.exports = router
