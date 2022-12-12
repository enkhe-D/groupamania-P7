const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then((user) =>
          res.status(201).json({ message: "Utilisateur créé !", user })
        )
        .catch((error) =>
          res
            .status(400)
            .json({ message: "problème dans signup", error: error })
        );
    })
    .catch((error) =>
      res.status(500).json({ message: "Database erreur", error: error })
    );
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "Email et/ou mot de passe incorrecte" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((validPassword) => {
          if (!validPassword) {
            return res
              .status(401)
              .json({ message: "Email et/ou mot de passe incorrecte" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              `${process.env.JWT_TOKEN_SECRET}`,
              {
                expiresIn: "12h",
              }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
