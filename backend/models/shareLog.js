const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Post = require("./post");

const ShareLogSchema = new Schema({
  postID: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true
  },
  borrower: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  isReturning: {
    type: Boolean,
    required: true,
    default: false
  },
  isReturned: {
    type: Boolean,
    required: true,
    default: false
  }
});

ShareLogSchema.pre("save", async function() {
  const { postID } = this;
  const ShareLog = this.constructor;

  //verify active post
  const post = await Post.findById(postID);
  if (!post.isActive) {
    throw Error("Post is inactive. Can't be shared!");
  }

  //verify non-pending post
  const pendingPost = await ShareLog.findOne({ postID, isReturned: false });
  if (pendingPost) {
    throw Error("Post is pending. Can't be shared!");
  }
});

const ShareLog = mongoose.model("ShareLog", ShareLogSchema);
module.exports = ShareLog;
