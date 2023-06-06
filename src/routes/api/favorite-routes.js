const express = require("express")
const router = express.Router()
const { authentificate, isValidId } = require("../../middleWares")
const favoriteList = require("../../controllers/favorite-controller")

router.use(authentificate)

router.post("/", favoriteList.postAddfavorite)
router.delete("/:id", isValidId, favoriteList.deletefavorite)
router.get("/", favoriteList.getAllfavorite)

module.exports = router
