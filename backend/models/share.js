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
  const { post, borrower, isApprovedByFrom, isReturnedByTo, isNew } = this;
  const Share = this.constructor;

  //verify postID
  const postDoc = await Post.findById(post);
  if (!postDoc) {
    throw Error("Post is not exist.");
  }

  if (isNew) {
    if (isApprovedByFrom !== undefined || isReturnedByTo === true) {
      throw Error("Unexpected initial Share state ");
    }

    //verify active post
    if (!postDoc.isActive) {
      throw Error("Post is not active.");
    }

    //verify connection
    const connection = await Connection.findOneByUsers(borrower, postDoc.by);
    if (!connection || !connection.approvedByTo || !connection.approvedByFrom) {
      throw Error("Post.by is not connected with borrower.");
    }

    //verify not requesting, not borrowing, not rejected
    const verifyingShares = await Share.findOne({
      post,
      $or: [
        {
          isApprovedByFrom: undefined //requesting
        },
        {
          isApprovedByFrom: false //rejected
        },
        {
          //borrowing
          isApprovedByFrom: true,
          isReturnedByTo: false
        }
      ]
    });
    if (verifyingShares) {
      throw Error("Post is not available.");
    }
  }
});

const Share = mongoose.model("Share", ShareSchema);
module.exports = Share;
