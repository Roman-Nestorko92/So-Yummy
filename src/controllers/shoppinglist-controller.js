const { ctrlWrapper } = require("../utils");
const { HttpError } = require("../helpers");
const { User } = require("../models/user");
const { ObjectId } = require("mongodb");

const postAddProducts = async (req, res) => {
  const { _id: userId } = req.user;
  const { _id, measure, ttl, thb } = req.body;
  if (!_id || !measure || !ttl || !thb) {
    throw HttpError(400, "Require `_id, measure, ttl, thb` fields");
  }
  const result = await User.findByIdAndUpdate(
    userId,
    {
      $push: {
        shoppingList: { ...req.body, id: new ObjectId() },
      },
    },
    { new: true }
  );

  res.status(201).json(result.shoppingList);
};

const deleteProducts = async (req, res) => {
  const { _id } = req.user;
  const { id } = req.body;

  const [list] = await User.find({ _id });

  const checkId = list.shoppingList.find((item) => item.id === id);

  if (list.shoppingList.length === 0 || !checkId) {
    throw HttpError(404, `Product with id=${id} is not found`);
  }

  const result = await User.findByIdAndUpdate(
    _id,
    {
      $pull: { shoppingList: { id } },
    },
    { new: true }
  );

  res.status(204);
};

const getAllProducts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  if (page < 1 || limit < 1) {
    throw HttpError(400, "Invalid page or limit value");
  }
  const [result] = await User.aggregate([
    {
      $match: {
        _id: _id,
      },
    },
    {
      $group: { _id: "$_id", shoppingList: { $first: "$shoppingList" } },
    },
    {
      $skip: Number(skip),
    },
    {
      $limit: Number(limit),
    },
  ]);

  res.json(result);
};

module.exports = {
  postAddProducts: ctrlWrapper(postAddProducts),
  deleteProducts: ctrlWrapper(deleteProducts),
  getAllProducts: ctrlWrapper(getAllProducts),
};
