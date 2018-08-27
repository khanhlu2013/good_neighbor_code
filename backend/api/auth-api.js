const route = require("express").Router();
const passport = require("passport");

const keys = require("../configs/keys");

route.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
route.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.redirect(keys.FRONTEND_URL);
});

if (keys.NODE_ENV !== "production") {
  route.get("/login_for_test_dev", (req, res, next) => {
    const User = require("../models/user");
    const { email, name } = req.query;
    (async () => {
      const user = await User.findOneOrCreate(email, name);
      req.login(user, err => {
        if (err) {
          console.log(err);
          res.status(500).send();
        } else {
          return res.redirect(keys.FRONTEND_URL);
        }
      });
    })().catch(next);
  });
}

module.exports = route;
