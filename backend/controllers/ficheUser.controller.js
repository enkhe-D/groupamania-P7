const FicheUser = require("../models/FicheUser.model");

//post
exports.createFicheUser = (req, res) => {
  const ficheUserObject = JSON.parse(req.body.ficheUser);

  console.log("------ficheUserObject---------");
  console.log(ficheUserObject);

  delete ficheUserObject._id;
  delete ficheUserObject._userId;

  const ficheUser = new FicheUser({
    ...ficheUserObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });

  ficheUser
    .save()
    .then(() =>
      res.status(201).json({ message: "utilisateur créé et enregistré" })
    )
    .catch((err) => res.status(400).json({ err }));
};

//get
exports.getAllUsers = (req, res) => {
  FicheUser.find()
    .then((ficheUsers) => res.status(200).json(ficheUsers))
    .catch((err) => res.status(200).json({ err }));
};

exports.getOneUser = (req, res) => {
  FicheUser.findOne({ _id: req.params.id })
    .then((ficheUser) => res.status(200).json(ficheUser))
    .catch((err) => res.status(400).json({ err }));
};

//update
exports.updateUser = (req, res) => {
  const ficheUserObject = req.file
    ? {
        ...JSON.pars(req.body.ficheUser),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete ficheUserObject._userId;
  FicheUser.findOne({ _id: req.params.id })
    .then((ficheUser) => {
      if (ficheUser.userId != req.auth.userId) {
        res.status(401).json({ message: "Vous n'êtes pas autorisé" });
      } else {
        FicheUser.updateOne(
          { _id: req.params.id },
          { ...ficheUser, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "modifié" }))
          .catch((err) => res.status(400).json({ err }));
      }
    })
    .catch((err) => res.status(401).json({ err }));
};

//delete
exports.deleteUser = (req, res) => {
  delete req.body._id;

  FicheUser.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "supprimé" }))
    .catch((err) => res.status(404).json({ err }));
};
