const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  userId: { type: String, required: true },
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  age: { type: Number },
  message: { type: String },
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model("ficheUser", Schema);
