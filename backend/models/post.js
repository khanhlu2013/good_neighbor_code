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
  const findFriends = [
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
        friend: {
          $cond: {
            if: { $eq: ["$from", me._id] },
            then: "$to",
            else: "$from"
          }
        }
      }
    }
  ];
  const joinFriendWithPost = [
    {
      $lookup: {
        from: "posts",
        localField: "friend",
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
    },
    {
      $group: {
        _id: "$friend",
        posts: { $push: "$post" }
      }
    },
    {
      $project: {
        friend: "$_id", //since share is join from post, i know this share is from that post
        posts: 1,
        _id: 0
      }
    }
  ];
  const inPosts = await Connection.aggregate([
    ...findFriends,
    ...joinFriendWithPost,
    ...joinPostwithShare,

    {
      $lookup: {
        from: "users",
        localField: "friend",
        foreignField: "_id",
        as: "user"
      }
    },
    {
      $project: {
        user: { $arrayElemAt: ["$user", 0] },
        posts: 1
      }
    }
  ]).exec();
  return inPosts;
};

module.exports = mongoose.model("Post", PostSchema);
