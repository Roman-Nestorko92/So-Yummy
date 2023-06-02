const express = require("express");
const router = express.Router();
const categoryControllers = require("../../controllers/category-controllers");
const { authentificate } = require("../../middleWares");

router.get(
  "/recipes/category-list",
  authentificate,
  categoryControllers.getListCategory
);

module.exports = router;
