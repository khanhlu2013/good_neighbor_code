const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const url = require("url");

const keys = require("./configs/keys");

//config
require("./configs/mongodb-config");
require("./configs/passport-config");

//app/middleware
const app = express();
if (process.env.NODE_ENV === "test") {
  app.use(function(req, res, next) {
    setTimeout(next, 70); //this allow test to pass
    // setTimeout(next, 500); //this allow test to pass
  });
}

app.use(
  cors({
    origin: [new url.URL(keys.FRONTEND_URL).origin],
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
  console.error("There is Error");
  console.error(err.stack);
  next(err);
});

//start app
app.listen(keys.PORT, () => {
  console.log(`app is listening on port ${keys.PORT}`);
});

module.exports = app;
