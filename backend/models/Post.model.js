const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    pseudo: {
      type: String,
      maxlength: [100, "Le pseudo est trop long"],
      required: true,
    },

    nom: {
      type: String,
      minlength: [2, "Le nom est trop court"],
      maxlength: [55, "Le nom est trop long"],
      required: [true, "Le nom est requis"],
    },

    prenom: {
      type: String,
      minlength: [2, "Le prenom est trop court"],
      maxlength: [55, "Le prenom est trop long"],
      required: [true, "Le Prenom est requis"],
    },

    message: {
      type: String,
      maxlength: 500,
      trim: true,
    },

    imageUrl: {
      type: String,
      required: true,
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

    comments: {
      type: [
        {
          commenterId: String,
          commentNom: String,
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
