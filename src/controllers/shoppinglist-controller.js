const { ctrlWrapper } = require("../utils")
const { HttpError } = require("../helpers")
const { User } = require("../models/user")

const postAddProducts = async (req, res) => {
  const { _id } = req.user
  const result = await User.findByIdAndUpdate(
    _id,
    {
      $push: {
        shoppingList: { ...req.body, id: req.body.id + req.body.measure },
      },
    },
    { new: true }
  )

  res.status(201).json(result)
}

const deleteProducts = async (req, res) => {
  const { _id } = req.user
  const { id } = req.body
  const result = await User.findByIdAndUpdate(_id, {
    $pull: { shoppingList: { id } },
  })
  if (result.shoppingList.length === 0 || result.shoppingList.id !== id) {
    throw HttpError(404, `Product with id=${id} is not found`)
  }

  res.json({
    message: "Delete success",
    result,
  })
}

const getAllProducts = async (req, res) => {
  const { _id } = req.user
  const { page = 1, limit = 10 } = req.query
  const skip = (page - 1) * limit
  const result = await User.aggregate([
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
  ])

  res.json(result)
}

module.exports = {
  postAddProducts: ctrlWrapper(postAddProducts),
  deleteProducts: ctrlWrapper(deleteProducts),
  getAllProducts: ctrlWrapper(getAllProducts),
}
