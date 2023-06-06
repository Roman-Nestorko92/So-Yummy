const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../utils");
const Joi = require("joi");

const nameRegex = /^[a-zA-Z0-9А-яЁёІіЇї\d]{1,16}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,16}$/;
const emailRegex = /^[a-zA-Z0-9_.]+@[a-zA-Z0-9_.]+(\.[a-zA-Z]+){1,2}$/;

const shoppingListSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    measure: {
      type: String,
      default: "",
    },
    thb: {
      type: String,
    },
    title: {
      type: String,
    },
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      trim: true,
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
    subscription: {
      type: Boolean,
      default: false,
    },
    shoppingList: [shoppingListSchema],
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const userRegistrSchema = Joi.object({
  name: Joi.string().regex(nameRegex).min(1).max(16).required().messages({
    "string.pattern.base": "Name limit: 16 letters",
  }),
  email: Joi.string()
    .min(7)
    .max(35)
    .regex(emailRegex)
    .email({ maxDomainSegments: 3, tlds: { deny: ["ru"] } })
    .required()
    .messages({
      "string.pattern.base": "min 7, max 35, only alphanum, `.`, `_` allowed",
      "any.required": "email is required",
    }),
  password: Joi.string()
    .min(6)
    .max(16)
    .regex(passwordRegex)
    .required()
    .messages({
      "string.min": "Must have at least 6 characters",
      "object.regex":
        "Password must have at least 6 characters, 1 upper case, 1 lower case and 1 digit",
      "string.pattern.base":
        "Password must have at least 6 characters, only alpanum, 1 upper case, 1 lower case and 1 digit",
    }),
});

// const userEmailSchema = Joi.object({
//   email: Joi.string().regex(emailRegex).required().messages({
//     "string.pattern.base": "Email must be valid",
//   }),
// });

const userLoginSchema = Joi.object({
  email: Joi.string()
    .min(7)
    .max(35)
    .email({
      allowUnicode: false,
      maxDomainSegments: 3,
      tlds: { deny: ["ru"] },
    })
    .required()
    .messages({
      "email.string": "Email must be valid (without /ru/ domain)",
    }),
  password: Joi.string().required(),
});

const userUpdateSchema = Joi.object({
  name: Joi.string().regex(nameRegex).min(1).max(16).required().messages({
    "string.pattern.base": "Name limit: 16 letters",
  }),
  avatar: Joi.any(),
});

const schemas = {
  userRegistrSchema,
  // userEmailSchema,
  userLoginSchema,
  userUpdateSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
