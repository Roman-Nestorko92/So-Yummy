const { ctrlWrapper } = require("../utils");
const { HttpError } = require("../helpers");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already exist");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  const currentUser = await User.findOne({ email });
  const { _id: id } = currentUser;
  const payload = {
    id: currentUser._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(id, { token });
  res.status(201).json({
    token,
    user: {
      name: currentUser.name,
      email: currentUser.email,
      avatarURL: currentUser.avatarURL,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401);
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401);
  }

  const { _id: id } = user;

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(id, { token });
  res.json({
    token,
    user: {
      email: user.email,
      email: user.email,
      avatarURL: user.avatarURL,
    },
  });
};

const getCurrent = async (req, res) => {
  const { name, email, avatarURL } = req.user;

  res.json({
    user: {
      name,
      email,
      avatarURL,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({
    message: "Logout success",
  });
};

const avatarsDir = path.resolve("src/public", "avatars");

const updateUser = async (req, res) => {
  const { name } = req.body;
  if (!name && !req.file) {
    throw HttpError(400, "Provide all necessary fields");
  }

  if (name) {
    req.user.name = name;
  }

  if (req.file) {
    const { path: tempUpload, filename } = req.file;
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", filename);
    req.user.avatarURL = avatarURL;
  }

  const data = {
    name: req.user.name,
    avatarURL: req.user.avatarURL,
  };

  await User.findByIdAndUpdate(req.user._id, data);

  res.json({
    data,
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateUser: ctrlWrapper(updateUser),
};
