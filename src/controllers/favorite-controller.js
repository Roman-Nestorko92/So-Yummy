const { ctrlWrapper } = require("../utils")
const { HttpError } = require("../helpers")
const { Recipe } = require("../models/recipe")
const ObjectId = require("mongodb").ObjectId

const patchAddfavorite = async (req, res) => {
  const { _id: owner } = req.user
  const { id: _id } = req.params
  const condition = await Recipe.find({ favorites: { $in: [owner] } }, { _id })
  console.log(condition)
  const func =
    condition.length === 0
      ? {
          $push: {
            favorites: owner,
          },
        }
      : {
          $pull: {
            favorites: owner,
          },
        }
  const result = await Recipe.findByIdAndUpdate(
    _id,
    func,

    { new: true }
  )
  res.status(201).json(result)
}

const getAllfavorite = async (req, res) => {
  const { _id: owner } = req.user
  const result = await Recipe.find({ favorites: { $in: [owner] } })
  // const result = await Recipe.find(
  //   {},
  //   "-createdAt -updatedAt -category -area -preview -popularity -favorites -likes -youtube -tags -ingredients "
  // )

  res.json(result)
}

module.exports = {
  patchAddfavorite: ctrlWrapper(patchAddfavorite),
  getAllfavorite: ctrlWrapper(getAllfavorite),
}
