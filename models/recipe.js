const { Schema, model } = require("mongoose")

const recipeSchema = new Schema({
  title: String,
  category: String,
  area: String,
  instructions: String,
  description: String,
  thumb: String,
  preview: String,
  time: String,
  popularity: Number,
  favorites: Array,
  likes: Array,
  youtube: String,
  tags: Array,
  ingredients: Array,
})

const Recipe = model("recipe", recipeSchema)

module.exports = Recipe
