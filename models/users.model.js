const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 48,
      required: true
    },
    email: {
      type: String,
      minlength: 5,
      maxlength: 255,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 1024
    }
  },
  {
    timestamps: true
  }
);

const User = Mongoose.model("Users", UserSchema);

module.exports = User;
