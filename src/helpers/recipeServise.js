const Recipe = require("../models/recipe");
const ObjectId = require("mongodb").ObjectId;
const { OwnRecipe } = require("../models/ownRecipe");

const piplineOneRecipe = (id) => {
  const pipeline = [
    {
      $match: {
        _id: new ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "ingridients",
        localField: "ingredients.id",
        foreignField: "_id",
        as: "ingridientInfo",
      },
    },

    {
      $set: {
        ingredients: {
          $map: {
            input: "$ingredients",
            in: {
              $mergeObjects: [
                "$$this",
                {
                  $arrayElemAt: [
                    "$ingridientInfo",
                    {
                      $indexOfArray: ["$ingridientInfo._id", "$$this.id"],
                    },
                  ],
                },
              ],
            },
          },
        },
      },
    },
    {
      $unset: ["ingridientInfo", "ingredients.id"],
    },
  ];
  return pipeline;
};

const recipeServise = async ({ id }) =>
  await Recipe.aggregate([...piplineOneRecipe(id)]);

const ownRecipeServise = async ({ id }) =>
  await OwnRecipe.aggregate([...piplineOneRecipe(id)]);

module.exports = {
  recipeServise,
  ownRecipeServise,
};
