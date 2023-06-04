const express = require("express")
const router = express.Router()
const { authentificate, isValidId } = require("../../middleWares")
const shoppingList = require("../../controllers/shoppinglist-controller")

router.use(authentificate)

router.post("/", shoppingList.postAddProducts)
router.delete("/", shoppingList.deleteProducts)
router.get("/", shoppingList.getAllProducts)

module.exports = router
