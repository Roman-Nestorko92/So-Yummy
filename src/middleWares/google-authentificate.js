const passport = require("passport");
const { Strategy } = require("passport-google-oauth2");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");
const gravatar = require("gravatar");

const { User } = require("../models/user");

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL } = process.env;

const googleParams = {
  clientID: `182102382272-ojfks0sf3i72du60oe9cdvp8rtkl7kc1.apps.googleusercontent.com`,
  clientSecret: `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`,
  callbackURL: `https://so-yummy-mg49.onrender.com/api/auth/google/callback`,
  passReqToCallback: true,
};

const googleCallback = async (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    const { email, displayName } = profile;
    const user = await User.findOne({ email });
    if (user) {
      return done(null, user);
    }
    const password = await bcrypt.hash(nanoid(), 10);
    const avatarURL = gravatar.url(email);

    const newUser = await User.create({
      email,
      password,
      name: displayName,
      avatarURL,
    });
    done(null, newUser);
  } catch (error) {
    done(error, false);
  }
};

const googleStrategy = new Strategy(googleParams, googleCallback);

passport.use("google", googleStrategy);

module.exports = passport;
