const { ctrlWrapper } = require("../utils")
const { HttpError } = require("../helpers")
const { Recipe } = require("../models/recipe")

const postAddfavorite = async (req, res) => {
  const result = await Recipe.create(...req.body)

  res.status(201).json(result)
}

const deletefavorite = async (req, res) => {
  const { id } = req.params
  const result = await Recipe.findByIdAndDelete(id)
  if (!result) {
    throw HttpError(400)
  }
  res.json({ message: "Delete success" })
}

const getAllfavorite = async (req, res) => {
  const result = await Recipe.find(
    {},
    "-createdAt -updatedAt -category -area -description -preview -popularity -favorites -likes -youtube -tags -ingredients "
  )

  res.json(result)
}

module.exports = {
  postAddfavorite: ctrlWrapper(postAddfavorite),
  deletefavorite: ctrlWrapper(deletefavorite),
  getAllfavorite: ctrlWrapper(getAllfavorite),
}
