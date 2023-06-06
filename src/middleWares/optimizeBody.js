const optimizeBody = (req, res, next) => {
  console.log("test");
  if (req.body) {
    const { category, ingredients: string } = req.body;
    if (string) {
      req.body.ingredients = JSON.parse(string);
    }

    if (category) {
      const modifiedCategory =
        category.charAt(0).toUpperCase() + category.slice(1);
      req.body.category = modifiedCategory;
    }
  }

  if (req.query.ingredient) {
    const { ingredient } = req.query;

    const arrOfWords = ingredient.split(" ");

    // Yes, we know that this is mutation but we have no choice
    req.query.ingredient = arrOfWords
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
  }

  next();
};

module.exports = optimizeBody;
