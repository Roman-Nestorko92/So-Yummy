const recipeCategoryServise = require("../helpers/recipeCategoryServise");
const { recipeServise } = require("../helpers/recipeServise");
const { ctrlWrapper } = require("../utils");

const getMainPageRecipe = async (req, res) => {
  const { categoryLimit = 4, recipeLimit = 4 } = req.query;

  const data = await recipeCategoryServise({ categoryLimit, recipeLimit });

  res.json(data);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;

  const data = await recipeServise({ id });

  res.json(data);
};

const getCategoryRecipe = async (req, res) => {
  const { recipeLimit = 8 } = req.query;
  const { category = "Beef" } = req.params;

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
