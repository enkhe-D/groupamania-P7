const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const utils = require("../utils/errors.utils");

//creation token et durée de vie du token
const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: maxAge });
};

//controller signup
module.exports.signUp = async (req, res) => {
  const { pseudo, email, password } = req.body;

  try {
    const user = await UserModel.create({ pseudo, email, password });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = utils.signUpErrors(err);
    res.status(200).send({ errors });
  }
};

//contoller du login
module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = utils.signInErrors(err);
    res.status(200).json({ errors });
  }
};

//controller du logout
module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
