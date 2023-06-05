const optimizeBody = (req, res, next) => {
  const { category, ingredients: string } = req.body;
  if (string) {
    req.body.ingredients = JSON.parse(string);
  }

  if (category) {
    const modifiedCategory =
      category.charAt(0).toUpperCase() + category.slice(1);
    req.body.category = modifiedCategory;
  }
  next();
};

module.exports = optimizeBody;
