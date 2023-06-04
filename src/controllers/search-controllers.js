const Recipe = require("../models/recipe");
const { ctrlWrapper } = require("../utils");

const getSearchRecipes = async (req, res) => {
  const { title } = req.query;

  //   await Recipe.createIndex({
  //     title: "text",
  //   });

  const result = await Recipe.find(
    { $text: { $search: title } }

    // { score: { $meta: "toextScore" } }
  );
  //   .sort({ score: { $meta: "textScore" } });

  res.status(200).json(result);
};

module.exports = {
  getSearchRecipes: ctrlWrapper(getSearchRecipes),
};
