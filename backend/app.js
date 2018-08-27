const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");

const keys = require("./configs/keys");

//config
require("./configs/mongodb-config");
require("./configs/passport-config");

//app/middleware
const app = express();
app.use(
  cors({
    origin: [keys.FRONTEND_URL],
    credentials: true
  })
);
app.use(bodyParser.json());
app.use(
  session({
    secret: keys.SESSION_SECRET,
    cookie: { maxAge: 15 * 24 * 60 * 60 * 1000 }
  })
);

//passport
app.use(passport.initialize());
app.use(passport.session());

//route
app.use("/auth", require("./api/auth-api"));
app.use("/profile", require("./api/profile-api"));

//log error
app.use(function logError(err, req, res, next) {
  console.log("There is Error");
  console.error(err.stack);
  next(err);
});

//start app
app.listen(keys.BACKEND_PORT, () => {
  console.log(`app is listening on port ${keys.BACKEND_PORT}`);
});

module.exports = app;
