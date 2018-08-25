const route = require("express").Router();

const keys = require("../configs/keys");
const { FRONTEND_URL } = keys;

if (keys.NODE_ENV === "production") {
  throw Error("Unexpect production env");
}

route.get("/dummy_login_for_test_purpose", (req, res, next) => {
  const User = require("../models/user");
  const { email, name } = req.query;

  (async () => {
    const user = await User.findOneOrCreate(email, name);
    req.login(user, err => {
      if (err) {
        console.log(err);
        res.status(500).send();
      } else {
        return res.redirect(FRONTEND_URL);
      }
    });
  })().catch(next);
});

module.exports = route;
