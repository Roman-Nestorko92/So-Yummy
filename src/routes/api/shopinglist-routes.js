const express = require("express");
const router = express.Router();
const { validateBody } = require("../../utils");
const { schemas } = require("../../models/user");
const { authentificate } = require("../../middleWares");
const shoppingList = require("../../controllers/shoppinglist-controller");

router.use(authentificate);

router.post(
  "/",
  validateBody(schemas.userShoppingListSchema),
  shoppingList.postAddProducts
);
router.delete("/", shoppingList.deleteProducts);
router.get("/", shoppingList.getAllProducts);

module.exports = router;
