const Category = require("../models/category");
const { ctrlWrapper } = require("../utils");

const getListCategory = async (req, res) => {
  const result = await Category.find();
  res.status(201).json(result);
};

module.exports = {
  getListCategory: ctrlWrapper(getListCategory),
};
