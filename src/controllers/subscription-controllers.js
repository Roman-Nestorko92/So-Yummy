const { ctrlWrapper } = require("../utils");
const { HttpError } = require("../helpers");
const createMessage = require("../helpers/emailTemplates/subscriptionEmail");
const sendEmail = require("../helpers/sendEmail");
const { Subscription } = require("../models/subscription");
const { User } = require("../models/user");

const subscription = async (req, res) => {
  const { email } = req.body;
  const { _id: subscriberId, name: subscriberName } = req.user;
  const checkEmail = await User.findOne({ email });
  if (!checkEmail) {
    throw HttpError(404, "Only registrated users can subscribe");
  }

  const subscriberCheck = await Subscription.findOne({ subscriberId });
  if (subscriberCheck) {
    throw HttpError(409, "User is subscribed already");
  }

  const { _id } = await Subscription.create({
    email,
    subscriberId,
    subscriberName,
  });

  // await User.findByIdAndUpdate(subscriberId, { subscription: true });

  const subscribtionEmail = {
    to: email,
    subject: "Newsletter subscription",
    html: createMessage(subscriberName, _id),
  };

  await sendEmail(subscribtionEmail);
  res.status(201).json({
    message: "Email send",
  });
};

const unSubscribtion = async (req, res) => {
  const { id: _id } = req.params;
  const check = await Subscription.findOne({ _id });
  if (!check) {
    throw HttpError(404, "This user is not subsribed");
  }
  await Subscription.findOneAndRemove({ _id });

  res.json({
    message: "Unsubscribed",
  });
};

module.exports = {
  subscription: ctrlWrapper(subscription),
  unSubscribtion: ctrlWrapper(unSubscribtion),
};
