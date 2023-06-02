const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../utils");
const Joi = require("joi");

const nameRegex = /^[a-zA-Z0-9А-яЁёІіЇї\d]{1,16}$/;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{6,16}$/; // one  letter, one digit, min 6 max 16

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
      match: passwordRegex,
      minlegth: 6,
      maxlength: 16,
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
    subscription: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const userRegistrSchema = Joi.object({
  name: Joi.string().regex(nameRegex).min(1).max(16).required().messages({
    "string.pattern.base": "Name limit: 16 letters",
  }),
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string()
    .min(6)
    .max(16)
    .regex(passwordRegex)
    .required()
    .messages({
      "string.min": "Must have at least 6 characters",
      "object.regex": "Must have at least 6 characters, 1 letter and 1 digit",
      "string.pattern.base":
        "Password must have at least 6 characters, 1 letter and 1 digit",
    }),
});

const userEmailSchema = Joi.object({
  email: Joi.string().regex(emailRegex).required().messages({
    "string.pattern.base": "Email must be valid",
  }),
});

const userLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().required(),
});

const userUpdateSchema = Joi.object({
  name: Joi.string().regex(nameRegex).min(1).max(16),
  avatarURL: Joi.any(),
});

const schemas = {
  userRegistrSchema,
  userEmailSchema,
  userLoginSchema,
  userUpdateSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
