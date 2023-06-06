const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  const { ownRecipeId } = req.params;
  const idReq = id ? id : ownRecipeId;
  if (!isValidObjectId(idReq)) {
    next(HttpError(404, `${idReq} is not valid id`));
  }
  next();
};

module.exports = isValidId;
