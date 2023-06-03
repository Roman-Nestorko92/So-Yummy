const Recipe = require("../models/recipe");
const { ctrlWrapper } = require("../utils");

const getPopularRecipes = async (req, res) => {
  const result = await Recipe.aggregate([
    {
      $addFields: {
        points: {
          $size: "$favorites",
        },
      },
    },
    {
      $group: {
        _id: "$_id",
        title: { $first: "$title" },
        preview: { $first: "$preview" },
        thumb: { $first: "$thumb" },
        instructions: { $first: "$instructions" },
        points: {
          $first: "$points",
        },
      },
    },
    {
      $sort: {
        points: -1,
      },
    },
  ]);
  res.status(201).json(result);
};

module.exports = {
  getPopularRecipes: ctrlWrapper(getPopularRecipes),
};