const { Schema, model } = require("mongoose")
const { handleMongooseError } = require("../utils")
const Joi = require("joi")

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegex,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      minlegth: 6,
      required: [true, "Set password for user"],
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    // verify: {
    //   type: Boolean,
    //   default: false,
    // },
    // verificationCode: {
    //   type: String,
    //   default: "",
    // },
  },
  { versionKey: false, timestamps: true }
)

userSchema.post("save", handleMongooseError)

const userRegistrSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
})

const userEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
})

const userLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().required(),
})

const schemas = {
  userRegistrSchema,
  userEmailSchema,
  userLoginSchema,
}

const User = model("user", userSchema)

module.exports = {
  User,
  schemas,
}
