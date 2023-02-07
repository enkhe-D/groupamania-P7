const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    pseudo: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      maxlength: 500,
      trim: true,
    },

    imageUrl: {
      type: String,
    },

    likes: {
      type: [Number],
      defaut: 0,
    },

    dislikes: {
      type: [Number],
      defaut: 0,
    },

    usersLiked: {
      type: [String],
    },

    usersDisliked: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("post", Schema);
