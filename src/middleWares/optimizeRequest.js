const { capitalizeString } = require("../helpers");

const optimizeRequest = (req, res, next) => {
  if (req.params.category) {
    req.params.category = capitalizeString(req.params.category);
  }

  if (req.body) {
    const { category, ingredients: string } = req.body;
    if (string) {
      req.body.ingredients = JSON.parse(string);
    }

    if (category) {
      req.body.category = capitalizeString(category);
    }
  }

  // if (req.query.ingredient) {
  //   const { ingredient } = req.query;

  //   const arrOfWords = ingredient.split(" ");

  //   // Yes, we know that this is mutation but we have no choice
  //   req.query.ingredient = arrOfWords
  //     .map((word) => word[0].toUpperCase() + word.slice(1))
  //     .join(" ");
  // }

  next();
};

module.exports = optimizeRequest;
