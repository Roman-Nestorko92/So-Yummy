const express = require("express");
const router = express.Router();
const {
  subscription,
  unSubscribtion,
} = require("../../controllers/subscription-controllers");
const { userEmailSchema } = require("../../models/subscription");
const { validateBody } = require("../../utils");
const { authentificate, isValidId } = require("../../middleWares");

router.post(
  "/subscribe",
  authentificate,
  validateBody(userEmailSchema),
  subscription
);

router.get("/subscribe/:id", isValidId, unSubscribtion);

module.exports = router;
