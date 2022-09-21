//importation des packages
const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

//creation du schéma user
const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minlength: 3,
      maxlenght: 100,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6,
    },
    picture: {
      type: String,
      default: "./uploads/profil/random-user.png",
    },
    bio: {
      type: String,
      max: 1024,
    },
    followers: {
      type: [String],
    },
    following: {
      type: [String],
    },
    likes: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

//cryptage des passwords
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// controle de email et password
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("email ou/et ou mot de passe incorrecte");
  }
  throw Error("email ou/et ou mot de passe incorrecte");
};

//exportation du module
const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
