const express = require("express")
const router = express.Router()
const {
  authentificate,
  isValidId,
  isValidIdRecipe,
} = require("../../middleWares")
const favoriteList = require("../../controllers/favorite-controller")

router.use(authentificate)

router.patch("/:id", isValidId, isValidIdRecipe, favoriteList.patchAddfavorite)
router.get("/", favoriteList.getAllfavorite)

module.exports = router
