const { Schema, model } = require("mongoose")

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumb: {
      type: String,
      required: true,
    },
    preview: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    popularity: {
      type: Number,
      required: true,
    },
    favorites: {
      type: Array,
      required: true,
    },
    likes: {
      type: Array,
      required: true,
    },
    youtube: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
)

const Recipe = model("recipe", recipeSchema)

module.exports = Recipe
