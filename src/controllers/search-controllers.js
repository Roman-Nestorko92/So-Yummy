const Recipe = require("../models/recipe");
const { ctrlWrapper } = require("../utils");

const getSearchRecipes = async (req, res) => {
  const { title } = req.query;

  const result = await Recipe.find({ $text: { $search: title } });

  res.status(200).json(result);
};

module.exports = {
  getSearchRecipes: ctrlWrapper(getSearchRecipes),
};
