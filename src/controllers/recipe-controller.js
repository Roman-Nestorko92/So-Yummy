const Recipe = require("../models/recipe");
const recipeCategoryServise = require("../helpers/recipeCategoryServise");
const { ctrlWrapper } = require("../utils");

const getMainPageRecipe = async (req, res) => {
  const { categoryLimit = 14, recipeLimit = 4 } = req.query;

  const data = await recipeCategoryServise({ categoryLimit, recipeLimit });

  res.json(data);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  console.log("id", id);

  const data = await Recipe.findById({ _id: id });
  if (!data || data === []) {
    throw HttpError(404, `Not found`);
  }
  res.json(data);
};

const getCategoryRecipe = async (req, res) => {
  const { recipeLimit = 8 } = req.query;
  const { category = "Beef" } = req.params;
  console.log("hello");

  const data = await recipeCategoryServise({
    recipeLimit,
    category,
  });
  res.json(data);
};

module.exports = {
  getMainPageRecipe: ctrlWrapper(getMainPageRecipe),
  getCategoryRecipe: ctrlWrapper(getCategoryRecipe),
  getRecipeById: ctrlWrapper(getRecipeById),
};
