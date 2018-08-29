process.env.NODE_ENV = "test";
require("../configs/mongodb-config");
const util = require("util");

const Connection = require("../models/connection");
const User = require("../models/user");

(async () => {
  console.clear();
  const me = await User.findOne({ email: "c@c.com" });
  const connections = await Connection.findMyFriendsOptimize(me);
  console.log(util.inspect(connections, { showHidden: false, depth: null }));
})().catch(e => {
  console.log(e);
});
