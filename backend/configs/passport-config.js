const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const _ = require("underscore");

const User = require("../model/user");
const keys = require("./keys");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

const {
  GOOGLE_CLIENT_ID: clientID,
  GOOGLE_CLIENT_SECRET: clientSecret,
  GOOGLE_REDIRECT_URL: callbackURL
} = keys;
passport.use(
  new GoogleStrategy(
    { clientID, clientSecret, callbackURL },
    (accessToken, refreshToken, profile, done) => {
      (async () => {
        const email = profile.emails[0].value;
        const name = profile.displayName;

        const user = await User.findOneOrCreate(email, name);
        done(null, user);
      })().catch(err => {
        done(err);
      });
    }
  )
);
