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

route.post("/backdoorLogin", (req, res, next) => {
  const User = require("../model/user");
  const { email, name } = req.body;
  (async () => {
    const user = await User.findOneOrCreate(
      email,
      name,
      null /*profileImageUrl*/
    );
    req.login(user, err => {
      if (err) {
        throw err;
      } else {
        res.send(user);
      }
    });
  })().catch(next);
});

module.exports = route;
