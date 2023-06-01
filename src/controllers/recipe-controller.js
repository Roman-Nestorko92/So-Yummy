const Recipe = require("../models/recipe")
const { HttpError } = require("../helpers")
const { ctrlWrapper } = require("../utils")

const getAllRecipe = async (req, res) => {
  const { _id: owner } = req.user
  const { page = 1, limit = 10 } = req.query
  const skip = (page - 1) * limit
  const result = await Recipe.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email")

  res.json(result)
}

module.exports = {
  getAllRecipe,
}
