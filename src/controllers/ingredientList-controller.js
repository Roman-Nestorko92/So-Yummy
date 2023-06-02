const { ctrlWrapper } = require("../utils")
const Ingredient = require("../models/ingridient")
const Recipe = require("../models/recipe")

const getIngredientList = async (req, res) => {
  const result = await Ingredient.aggregate([
    {
      $group: {
        _id: "$_id",
        title: { $first: "$ttl" },
        thumb: { $first: "$thb" },
      },
    },
  ])
  res.status(200).json(result)
}

const getIngredientSearch = async (req, res) => {
  const { ingredientsId } = req.params
  const result = await Recipe.find(
    {},
    {
      ingredients: {
        $elemMatch: {
          id: ingredientsId,
        },
      },
    }
  )
  //   const result = await Recipe.aggregate([
  // {
  //   $match: {
  //     ingredients: ingredientsId,
  //   },
  // },

  // {
  //   $match: {
  //     ingredients: {
  //       $elemMatch: {
  //         id: ingredientsId,
  //       },
  //     },
  //   },
  // },

  //aggregate.match({ department: { $in: [ "sales", "engineering" ] } });
  //   {
  //     $lookup: {
  //       from: "recipes",
  //       localField: "_id",
  //       foreignField: "_id",
  //       as: "recipes",
  //     },
  //   },
  //   {
  //     points: {
  //       $map: {
  //         input: "$recipes",
  //         as: "obj",
  //         in: "$$obj.ingridients",
  //       },
  //     },
  //   },
  //   ])
  console.log(result)
  res.status(200).json(result)
}

module.exports = {
  getIngredientList: ctrlWrapper(getIngredientList),
  getIngredientSearch: ctrlWrapper(getIngredientSearch),
}
