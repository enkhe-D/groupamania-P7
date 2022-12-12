const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

Schema.plugin(uniqueValidator);

module.exports = mongoose.model("user", Schema);
