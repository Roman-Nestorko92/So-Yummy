const Recipe = require("../models/recipe");
const Ingredient = require("../models/ingridient");
const ObjectId = require("mongodb").ObjectId;
const { ctrlWrapper } = require("../utils");
const { HttpError } = require("../helpers");

const getSearchRecipes = async (req, res) => {
  const {
    title: recipeName,
    ingredient: ingr,
    page = 1,
    limit = 12,
  } = req.query;

  let searchQuery = "";

  const skip = (page - 1) * limit;
  if (page < 1 || limit < 1) {
    throw HttpError(400, "Invalid page or limit value");
  }

  const valueToCheck = recipeName ? recipeName : ingr;
  const regex = /[.*+?^${}()|[\]#\\]/g;
  if (regex.test(valueToCheck)) {
    throw HttpError(400);
  }

  if (recipeName) {
    searchQuery = { title: { $regex: new RegExp(recipeName, "i") } };
  }

  if (ingr) {
    const [data] = await Ingredient.find({
      ttl: { $regex: new RegExp(ingr, "i") },
    });

    if (!data) {
      throw HttpError(404);
    }

    searchQuery = {
      ingredients: {
        $elemMatch: {
          id: new ObjectId(data._id),
        },
      },
    };
  }

  const result = await Recipe.aggregate([
    {
      $match: searchQuery,
    },
    {
      $skip: Number(skip),
    },
    {
      $limit: Number(limit),
    },
  ]);

  if (result.length === 0) {
    throw HttpError(404);
  }

  res.status(200).json(result);
};

module.exports = {
  getSearchRecipes: ctrlWrapper(getSearchRecipes),
};
