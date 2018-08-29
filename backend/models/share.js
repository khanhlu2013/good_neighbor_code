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

ShareSchema.pre("save", async function() {
  const { postID, borrower, isApprovedByFrom, isReturnedByTo, isNew } = this;
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
    const connection = await Connection.findOneByUser(borrower, post.by);
    if (!connection || !connection.approvedByTo || !connection.approvedByFrom) {
      throw Error("Post.by is not connected with borrower.");
    }

    //verify non-sharing share
    const sharingShare = await Share.findOne({
      postID,
      isApprovedByFrom: true,
      isReturnedByTo: false
    });
    if (sharingShare) {
      throw Error("Post is not available.");
    }
  }
});

const Share = mongoose.model("Share", ShareSchema);
module.exports = { Share };
