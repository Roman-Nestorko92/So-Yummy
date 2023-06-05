const isValidId = require("./isValid");
const authentificate = require("./authentificate");
const { uploadRecipe, uploadAvatar } = require("./upload");
const optimizeBody = require("./optimizeBody");
const isValidCategory = require("./validateCategory");

module.exports = {
  isValidId,
  authentificate,
  uploadRecipe,
  uploadAvatar,
  optimizeBody,
  isValidCategory,
};
