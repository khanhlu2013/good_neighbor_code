const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Post = require("./post");
const Connection = require("./connection");

const ShareLogSchema = new Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true
  },
  borrower: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  dateCreated: {
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
  const { postID, borrower, isReturning, isReturned, isNew } = this;
  const ShareLog = this.constructor;

  //verify postID
  const post = await Post.findById(postID);
  if (!post) {
    throw Error("Post is not exist.");
  }

  //verify connection
  const connection = await Connection.findOneByUser(borrower, post.by);
  if (!connection) {
    throw Error("Post.by is not connected with borrower.");
  }

  if (isNew) {
    if (isReturning || isReturned) {
      throw Error("Cant create isReturning or isReturned ShareLog");
    }

    //verify active post
    if (!post.isActive) {
      throw Error("Post is not active.");
    }

    //verify non-pending post
    const pendingPost = await ShareLog.findOne({ postID, isReturned: false });
    if (pendingPost) {
      throw Error("Post is pending.");
    }
  }
});

const ShareLog = mongoose.model("ShareLog", ShareLogSchema);
module.exports = { ShareLog };
