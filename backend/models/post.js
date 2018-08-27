const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
