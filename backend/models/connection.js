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
ConnectionSchema.statics.findOneByUsers = async function(user1, user2) {
  const Connection = this;
  return await Connection.findOne({
    $or: [{ from: user1, to: user2 }, { from: user2, to: user1 }]
  });
};

const Connection = mongoose.model("Connection", ConnectionSchema);
module.exports = Connection;
