process.env.NODE_ENV = "test";
require("../configs/mongodb-config");
const util = require("util");

const Connection = require("../model/connection");
const User = require("../model/user");
const Post = require("../model/post");
const Share = require("../model/share");

(async () => {
  const u1 = await User.findOne({ email: "1@1.com" });
  const u2 = await User.findOne({ email: "2@2.com" });
  const me = await User.findOne({ email: "me@me.com" });

  // const p1 = await Post.findOne({ user: u1._id });
  // const share = new Share({ post: p1._id, borrower: me._id });
  // await share.save();

  const outPosts = await Post.findOutPosts(u1);
  console.log(JSON.stringify(outPosts, null, 4));
})().catch(e => {
  console.log(e);
});
