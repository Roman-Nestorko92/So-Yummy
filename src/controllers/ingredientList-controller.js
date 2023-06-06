const { ctrlWrapper } = require("../utils");
const Ingredient = require("../models/ingridient");
const Recipe = require("../models/recipe");
const ObjectId = require("mongodb").ObjectId;

const getIngredientList = async (req, res) => {
  const result = await Ingredient.aggregate([
    {
      $group: {
        _id: "$_id",
        title: { $first: "$ttl" },
        thumb: { $first: "$thb" },
      },
    },
  ]);
  res.status(200).json(result);
};

const getIngredientSearch = async (req, res) => {
  const { ingredient } = req.query;

  const [data] = await Ingredient.find({ ttl: ingredient });

  const result = await Recipe.aggregate([
    {
      $match: {
        ingredients: {
          $elemMatch: {
            id: new ObjectId(data._id),
          },
        },
      },
    },
  ]);

  res.status(200).json(result);
};

module.exports = {
  getIngredientList: ctrlWrapper(getIngredientList),
  getIngredientSearch: ctrlWrapper(getIngredientSearch),
};
