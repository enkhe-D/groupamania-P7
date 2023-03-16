const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// pour cree et enregistrer un compte
exports.register = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then((user) =>
          res.status(201).json({
            message: "Utilisateur créé et sauvegardé dans la base de donnée",
            user,
          })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// exports.signup = async (req, res) => {
//   console.log("------> req.body <---------");
//   console.log(req.body);
//   console.log("----------------------");

//   const { pseudo, email, password } = req.body;

//   try {
//     const user = await User.create({ pseudo, email, password });
//     res.status(201).json({ user: user._id, user });
//   } catch (err) {
//     res.status(200).json({ err });
//   }

//   // bcrypt
//   //   .hash(req.body.password, 10)
//   //   .then((hash) => {
//   //     const user = new User({
//   //       email: req.body.email,
//   //       password: hash,
//   //     });
//   //     user
//   //       .save()
//   //       .then((user) =>
//   //         res.status(201).json({ message: "Utilisateur créé !", user })
//   //       )
//   //       .catch((error) =>
//   //         res
//   //           .status(400)
//   //           .json({ message: "problème dans signup", error: error })
//   //       );
//   //   })
//   //   .catch((error) =>
//   //     res.status(500).json({ message: "Database erreur", error: error })
//   //   );
// };

//pour ce connecter a son compte
exports.login = (req, res) => {
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
              { userId: user._id, admin: user.admin },
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
