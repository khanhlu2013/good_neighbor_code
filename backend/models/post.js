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

PostSchema.statics.findOutPosts = async function(user) {
  const Post = this;
  return Post.find({ by: user }).populate("by");
};

PostSchema.statics.findInPosts = async function(user) {
  const findUsers = [
    {
      $match: {
        approvedByTo: true,
        approvedByFrom: true,
        $or: [{ from: user._id }, { to: user._id }]
      }
    },
    {
      $project: {
        _id: 0,
        user: {
          $cond: {
            if: { $eq: ["$from", user._id] },
            then: "$to",
            else: "$from"
          }
        }
      }
    }
  ];
  const joinUserWithPost = [
    {
      $lookup: {
        from: "posts",
        localField: "user",
        foreignField: "by",
        as: "post"
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
        as: "share"
      }
    },
    {
      $unwind: {
        path: "$share",
        preserveNullAndEmptyArrays: true
      }
    }
  ];
  const joinWithBorrower = [
    {
      $lookup: {
        from: "users",
        localField: "share.borrower",
        foreignField: "_id",
        as: "share.borrower"
      }
    },
    {
      $addFields: {
        "share.borrower": { $arrayElemAt: ["$share.borrower", 0] }
      }
    }
  ];
  const finalized = [
    {
      $group: {
        _id: {
          user: "$user",
          post: "$post._id"
        },
        shares: {
          $push: "$share"
        }
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "_id.user",
        foreignField: "_id",
        as: "userInfo"
      }
    },
    {
      $lookup: {
        from: "posts",
        localField: "_id.post",
        foreignField: "_id",
        as: "postInfo"
      }
    },
    {
      $project: {
        _id: 0,
        user: { $arrayElemAt: ["$userInfo", 0] },
        post: { $arrayElemAt: ["$postInfo", 0] },
        shares: 1
      }
    }
  ];
  const inPosts = await Connection.aggregate([
    ...findUsers,
    ...joinUserWithPost,
    ...joinPostwithShare,
    ...joinWithBorrower,
    ...finalized
  ]).exec();
  return inPosts;
};

module.exports = mongoose.model("Post", PostSchema);
