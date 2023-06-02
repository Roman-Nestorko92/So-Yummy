const { Schema, model } = require("mongoose")
const { handleMongooseError } = require("../utils")

const indredientSchema = new Schema({
  ttl: String,
  desc: String,
  thb: String,
})

indredientSchema.post("save", handleMongooseError)

const Ingredient = model("ingridient", indredientSchema)

module.exports = Ingredient
