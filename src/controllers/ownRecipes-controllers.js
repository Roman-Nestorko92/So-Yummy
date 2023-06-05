const { ObjectId } = require("mongodb");
const { OwnRecipe } = require("../models/ownRecipe");
const { ctrlWrapper } = require("../utils");
const { HttpError } = require("../helpers");
const { cloudinary } = require("../utils");

const addOwnRecipe = async (req, res) => {
  const { title, description, category, time, instructions } = req.body;
  const { _id: owner } = req.user;

  const ingredients = req.body.ingredients.map((item) => {
    return { ...item, id: new ObjectId(item.id) };
  });

  let preview = null;

  if (req.file) {
    const imageUrl = cloudinary.url(req.file.filename);
    preview = imageUrl;
  }

  const data = await OwnRecipe.create({
    title,
    description,
    category,
    time,
    ingredients,
    preview,
    instructions,
    owner,
  });

  res.status(201).json({
    title,
    description,
    category,
    time,
    ingredients,
    preview,
    instructions,
  });
};

const getOwnRecipes = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 4 } = req.query;
  console.log(page);
  if (page < 1 || limit < 1) {
    throw HttpError(400, "Invalid page or limit value");
  }

  const skip = (page - 1) * limit;

  const data = await OwnRecipe.find({ owner }, "-updatedAt -createdAt -owner", {
    skip,
    limit,
  });

  res.json(data);
};
const deleteOwnRecipe = async (req, res) => {
  const deletedRecipe = await OwnRecipe.findByIdAndRemove(req.params.recipeId);
  if (!deletedRecipe) {
    throw HttpError(404, `Recipe with id "${req.params.recipeId}" is missing`);
  }
  res.status(204);
};

module.exports = {
  addOwnRecipe: ctrlWrapper(addOwnRecipe),
  getOwnRecipes: ctrlWrapper(getOwnRecipes),
  deleteOwnRecipe: ctrlWrapper(deleteOwnRecipe),
};
