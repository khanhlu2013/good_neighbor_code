const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email"
    }
  },
  name: {
    type: String,
    required: true,
    minlength: 1
  }
});

UserSchema.toJSON = function() {
  const user = this.toObject();

  return {
    id: user._id,
    email: user.email,
    name: user.name
  };
};
UserSchema.statics.findOneOrCreate = function(emailFind, nameCreate) {
  const User = this;
  return (async () => {
    let user = await User.findOne({ email: emailFind });
    if (user) {
      return user;
    }

    user = await new User({
      email: emailFind,
      name: nameCreate
    }).save();
    return user;
  })();
};
const User = mongoose.model("User", UserSchema);
module.exports = User;
