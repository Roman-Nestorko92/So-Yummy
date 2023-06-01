// const Recipe = require("../models/recipe");
const Category = require("../models/category");
// const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../utils");

const getMainPageRecipe = async (req, res) => {
  const { categoryLimit = 4, recipeLimit = 4 } = req.query;

  const mainPageServise = async ({ categoryLimit, recipeLimit }) =>
    await Category.aggregate([
      {
        $lookup: {
          from: "recipes",
          // pipeline: [...calculatePopularityOfRecipes()],
          localField: "category",
          foreignField: "category",
          // let: {
          //   id: "$_id",
          // },
          as: "recipes",
        },
      },
      {
        $addFields: {
          points: {
            $sum: {
              $map: {
                input: "$recipes",
                as: "obj",
                in: "$$obj.popularity",
              },
            },
          },
        },
      },
      {
        $project: {
          points: 1,
          category: 1,
          recipes: 1,
        },
      },
      {
        $unwind: {
          path: "$recipes",
        },
      },
      {
        $sort: {
          "recipes.popularity": -1,
        },
      },
      {
        $group: {
          _id: "$_id",
          recipes: {
            $push: {
              _id: "$recipes._id",
              title: "$recipes.title",
              preview: "$recipes.preview",
              thumb: "$recipes.thumb",
            },
          },
          points: {
            $first: "$points",
          },
          category: {
            $first: "$category",
          },
        },
      },
      {
        $addFields: {
          recipes: {
            $slice: ["$recipes", 0, Number(recipeLimit)],
          },
        },
      },
      {
        $sort: {
          points: -1,
        },
      },
      {
        $limit: Number(categoryLimit),
      },
    ]);

  const data = await mainPageServise({ categoryLimit, recipeLimit });

  res.json(data);
};

module.exports = {
  getMainPageRecipe: ctrlWrapper(getMainPageRecipe),
};
