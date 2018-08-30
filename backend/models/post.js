const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Connection = require("./connection");

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

PostSchema.statics.findInPosts = async function(me) {
  const findUsers = [
    {
      $match: {
        approvedByTo: true,
        approvedByFrom: true,
        $or: [{ from: me._id }, { to: me._id }]
      }
    },
    {
      $project: {
        _id: 0,
        user: {
          $cond: {
            if: { $eq: ["$from", me._id] },
            then: "$to",
            else: "$from"
          }
        }
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user"
      }
    },
    {
      $project: {
        user: { $arrayElemAt: ["$user", 0] }
      }
    }
  ];
  const joinUserWithPost = [
    {
      $lookup: {
        from: "posts",
        localField: "user._id",
        foreignField: "by",
        as: "post"
      }
    },
    {
      $project: {
        "post.by": 0 //posts result is grouped by posted user. remove unnessesary
      }
    },
    {
      $unwind: {
        path: "$post"
      }
    }
  ];
  const joinPostwithShare = [
    {
      $lookup: {
        from: "shares",
        localField: "post._id",
        foreignField: "post",
        as: "post.shares"
      }
    },
    {
      $project: {
        "post.shares.post": 0 //since share is join from post, i know this share is from that post
      }
    }
  ];
  const inPosts = await Connection.aggregate([
    ...findUsers,
    ...joinUserWithPost,
    ...joinPostwithShare
  ]).exec();
  return inPosts;
};

module.exports = mongoose.model("Post", PostSchema);
