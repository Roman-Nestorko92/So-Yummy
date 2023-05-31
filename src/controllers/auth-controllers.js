const { ctrlWrapper } = require("../utils")
const { HttpError } = require("../helpers")
const { User } = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const gravatar = require("gravatar")
const path = require("path")
const fs = require("fs/promises")
const { SECRET_KEY } = process.env
// const { nanoid } = require("nanoid")

const register = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw HttpError(409, "Email already exist")
  }

  const hashPassword = await bcrypt.hash(password, 10)
  const avatarURL = gravatar.url(email)
  //   const verificationCode = nanoid()
  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    // verificationCode,
  })

  //   const verifyEmail = {
  //     to: email,
  //     subject: "Verify email",
  //     html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click verify email</a>`,
  //   }

  //   await sendEmail(verifyEmail)

  res.status(201).json({
    email: result.email,
    subscription: result.subscription,
    password: result.password,
  })
}

// const verify = async (req, res) => {
//   const { verificationCode } = req.params
//   const user = await User.findOne({ verificationCode })
//   if (!user) {
//     throw HttpError(404)
//   }
//   await User.findByIdAndUpdate(user._id, { verify: true, verificationCode: "" })

//   res.json({
//     message: "Verify success",
//   })
// }

// const resendVerifyEmail = async (req, res) => {
//   const { email } = req.body
//   const user = await User.findOne({ email })
//   if (!user) {
//     throw HttpError(404)
//   }

//   if (user.verify) {
//     throw HttpError(400, "Email already verify")
//   }

//   const verifyEmail = {
//     to: email,
//     subject: "Verify email",
//     html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationCode}">Click verify email</a>`,
//   }

//   await sendEmail(verifyEmail)

//   res.json({
//     message: "Verify email resend",
//   })
// }

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user || !user.verify) {
    throw new HttpError(401)
  }

  const passwordCompare = await bcrypt.compare(password, user.password)
  if (!passwordCompare) {
    throw new HttpError(401)
  }

  const { _id: id } = user

  const payload = {
    id: user._id,
  }

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" })
  await User.findByIdAndUpdate(id, { token })
  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  })
}

const getCurrent = async (req, res) => {
  const { name, email } = req.user

  res.json({
    user: {
      name,
      email,
    },
  })
}

const logout = async (req, res) => {
  const { _id } = req.user
  await User.findByIdAndUpdate(_id, { token: "" })

  res.json({
    message: "Logout success",
  })
}

const avatarsDir = path.resolve("public", "avatars")

const updateAvatar = async (req, res) => {
  const { path: tempUpload, filename } = req.file
  const resultUpload = path.join(avatarsDir, filename)
  await fs.rename(tempUpload, resultUpload)
  const avatarURL = path.join("avatars", filename)
  await User.findByIdAndUpdate(req.user._id, { avatarURL })

  res.json({
    avatarURL,
  })
}

module.exports = {
  register: ctrlWrapper(register),
  // verify: ctrlWrapper(verify),
  // resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
}
