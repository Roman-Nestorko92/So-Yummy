const express = require("express");
const controllers = require("../../controllers/recipe-controller");
// const { validateBody, isValidId, authenticate } = require("../../middlewares");
// const { schemas } = require("../../models/contact");
const router = express.Router();

router.get("/main-page", controllers.getMainPageRecipe);

module.exports = router;
