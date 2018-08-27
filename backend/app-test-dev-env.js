const app = require("./app-share-no-auth");
const keys = require("./configs/keys");

if (keys.NODE_ENV === "production") {
  throw Error("Unexpect product env");
}
app.use("/auth", require("./api/auth-api-test-dev-env"));
app.use(function logError(err, req, res, next) {
  console.log("There is Error");
  console.error(err.stack);
  next(err);
});
module.exports = app;
