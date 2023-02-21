const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    userId: {
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

    video: {
      type: String,
    },

    likers: {
      type: [String],
      required: true,
    },
    comments: {
      type: [
        {
          commenterId: String,
          pseudoComment: String,
          text: String,
          timestamp: Number,
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("post", Schema);
