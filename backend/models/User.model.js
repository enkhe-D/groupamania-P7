const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 55,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    picture: {
      type: String,
      default: "./images/Image003.jpg",
    },
    bio: {
      type: String,
    },
    followers: {
      type: [String],
    },
    followings: {
      type: [String],
    },
    likes: {
      type: [String],
    },
    admin: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timesstampes: true,
  }
);

Schema.plugin(uniqueValidator);

module.exports = mongoose.model("user", Schema);
