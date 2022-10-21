require("dotenv").config();
const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");

//Sigup
exports.signup = (req, res) => {
  const emailCryptoJs = cryptojs
    .HmacSHA256(req.body.email, `${process.env.CRYPTO_EMAIL}`)
    .toString();

  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: emailCryptoJs,
        password: hash,
      });

      user
        .save()
        .then(() =>
          res.status(201).json({ message: "Utilisateur créé et sauvegardé" })
        )
        .catch((err) => res.status(400).json({ err }));
    })
    .catch((err) => res.status(500).json({ err }));
};

// LOGIN
exports.login = (req, res) => {
  const emailCryptoJs = cryptojs
    .HmacSHA256(req.body.email, `${process.env.CRYPTO_EMAIL}`)
    .toString();

  User.findOne({ email: emailCryptoJs })

    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur inconnue" });
      }

      bcrypt
        .compare(req.body.password, user.password)
        .then((validPassword) => {
          if (!validPassword) {
            return res
              .status(401)
              .json({ error: "mot de passe ou email incorrecte" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              `${process.env.TOKEN_SECRET}`,
              { expiresIn: "12h" }
            ),
          });
        })
        .catch((err) => res.status(400).json({ err }));
    })
    .catch((err) => res.status(500).json({ err }));
};
