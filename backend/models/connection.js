const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConnectionSchema = new Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  approvedByTo: {
    type: Boolean, //only 'to' can change this field
    required: false //3 value allow: undefined/pending, true, false
  },
  approvedByFrom: {
    type: Boolean, //only 'from' can change this field
    required: true,
    default: true
  }
});

ConnectionSchema.index({ from: 1, to: 1 }, { unique: true });
ConnectionSchema.pre("save", async function() {
  const connection = this;
  const reverseConnection = await this.constructor.findOne({
    from: connection.to,
    to: connection.from
  });
  if (reverseConnection) {
    throw Error("Error: reverse connection exist");
  }
});
ConnectionSchema.statics.findMyConnections = async function(me) {
  const Connection = this;
  return await Connection.find({
    $or: [{ from: me }, { to: me }]
  })
    .populate("from") //frontend need to know the name and email of user
    .populate("to"); //frontend need to know the name and email of user
};
ConnectionSchema.statics.findMyFriends = async function(me) {
  const Connection = this;
  const connections = await Connection.findMyConnections(me);
  const friends = connections
    .filter(
      connection => connection.isApprovedByFrom && connection.isApprovedByTo
    )
    .map(
      connection =>
        connection.from.equals(me) ? connection.to : connection.from
    );
  return friends;
};
ConnectionSchema.statics.findMyFriendsOptimize = async function(me) {
  const Connection = this;
  const connections = await Connection.aggregate([
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
    },
    {
      $lookup: {
        from: "posts",
        localField: "friend",
        foreignField: "by",
        as: "posts"
      }
    }
    // {
    //   $lookup: {
    //     from: "posts",
    //     localField: "friend",
    //     foreignField: "by",
    //     as: "posts"
    //   }
    // },
  ]).exec();
  return connections;
};
const Connection = mongoose.model("Connection", ConnectionSchema);
module.exports = Connection;
