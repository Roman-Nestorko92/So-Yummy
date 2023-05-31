const Recipe = require("../models/recipe")
const { HttpError } = require("../helpers")
const { ctrlWrapper } = require("../utils")

const getAllRecipe = async (req, res) => {
  const result = await Recipe.find()

  res.json(result)
}

module.exports = {
  getAllRecipe,
}
