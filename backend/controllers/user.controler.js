const User = require("../models/User.model");

//----------READ ALL USER
exports.readAllProfil = (req, res) => {
  User.find()
    .then((users) => res.status(200).json({ users }))
    .catch((error) =>
      res.status(500).json({ message: "Database Erreur FINDALL", error: error })
    );
};

//----------READ ONE USER
exports.readOneProfil = (req, res) => {
  let id = req.params.id;

  User.findOne({ _id: id })
    .then((user) => res.status(200).json({ user }))
    .catch((error) =>
      res.status(404).json({ message: "Utilisateur introuvable", error: error })
    );
};

//----------UPDATE USER
exports.updateProfil = (req, res) => {
  const id = req.params.id;

  const dataUser = req.file
    ? {
        ...JSON.parse(req.body.profil),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete dataUser._id;
  delete dataUser._userId;

  User.findOne({ _id: id })
    .then((user) => {
      if (user.userId != req.auth.userId) {
        res.status(401).json({ message: "Vous n'avez pas l autorisation" });
      } else {
        if (req.file) {
          //mise a jour de l image
          const filename = profil.imageUrl.split("/images/")[1];

          fs.unlink(`images/${filename}`, () => {
            User.updateOne({ _id: id }, { ...dataUser, _id: id })
              .then(() =>
                res.status(200).json({ message: "Profile mise à jour" })
              )
              .catch((error) => res.status(401).json({ error }));
          });
          //update sans modif image
        } else {
          Profil.updateOne({ _id: id }, { ...dataUser, _id: id })
            .then(() =>
              res.status(200).json({ message: "Utilisateur mise à jour" })
            )
            .catch((error) => res.status(401).json({ error }));
        }
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//----------DELETE USER
exports.deleteProfil = (req, res) => {
  const id = req.params.id;

  //trouver l utilisateur avec l id
  User.findOne({ _id: id })
    .then((user) => {
      if (user.userId != req.auth.userId) {
        res.status(401).json({ message: "Vous n'avez pas l autorisation" });
      } else {
        const filename = profil.imageUrl.split("/images/")[1];

        fs.unlink(`images/${filename}`, () => {
          User.deleteOne({ _id: id })
            .then(() =>
              res.status(200).json({ message: "Utilisateur supprimé" })
            )
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
