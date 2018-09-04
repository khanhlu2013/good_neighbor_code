const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Post = require("./post");
const Connection = require("./connection");

const ShareSchema = new Schema({
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
  isApprovedByFrom: {
    type: Boolean,
    required: false //pending request is undefined
  },
  isReturnedByTo: {
    type: Boolean,
    required: true,
    default: false
  }
});

ShareSchema.pre("remove", async function() {
  if (this.isApprovedByFrom !== undefined) {
    throw Error(
      "Can only remove requesting share, but not reject, or borrowing, or borrowed share"
    );
  }
});

ShareSchema.pre("save", async function() {
  const {
    post: postID,
    borrower,
    isApprovedByFrom,
    isReturnedByTo,
    isNew
  } = this;
  const Share = this.constructor;

  //verify postID
  const post = await Post.findById(postID);
  if (!post) {
    throw Error("Post is not exist.");
  }

  if (isNew) {
    if (isApprovedByFrom !== undefined || isReturnedByTo === true) {
      throw Error("Unexpected initial Share state ");
    }

    //verify active post
    if (!post.isActive) {
      throw Error("Post is not active.");
    }

    //verify connection
    const connection = await Connection.findOneByUsers(borrower, post.user);
    if (!connection || !connection.approvedByTo || !connection.approvedByFrom) {
      throw Error("Post.user is not connected with borrower.");
    }

    //verify not currently: requesting or borrowing or denied
    const verifyingShares = await Share.findOne({
      postID,
      borrower,
      $or: [
        { isApprovedByFrom: { $not: { $eq: true } } }, //currently not approve <=> aka <=> requesting or denied
        { isReturnedByTo: false } //currently borrowing
      ]
    });
    if (verifyingShares) {
      throw Error("Post is not available");
    }
  }
});

const Share = mongoose.model("Share", ShareSchema);
module.exports = Share;
