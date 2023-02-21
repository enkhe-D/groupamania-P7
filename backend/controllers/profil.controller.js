const User = require("../models/User.model");

//récupération de tous les utilisateurs
exports.getAllProfils = (req, res) => {
  User.find()
    .select("-password -__v")
    .then((users) => res.status(200).json({ users }))
    .catch((error) => res.status(400).json({ error }));
};

//récupération de un  utilisateur
exports.getOneProfil = (req, res) => {
  // console.log("---req.params------");
  // console.log(req.params);

  // console.log("----req.body-----");
  // console.log(req.body);

  User.findById(req.params.id)
    .select("-password -__v")
    .then((user) => res.status(200).json({ user }))
    .catch((error) => res.status(400).json({ error }));
};

//Mise a jour d'un utilisateur
exports.updateProfil = (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    {
      $set: {
        bio: req.body.bio,
      },
    }
  )
    .then((update) =>
      res.status(200).json({ message: "Profil mise a jour", update })
    )
    .catch((error) => res.status(400).json({ error }));
};

//Suppression d'un utilisateur
exports.deleteProfil = (req, res) => {
  // console.log("-----req.params.id----delete------");
  // console.log(req.params);

  User.findByIdAndDelete(req.params.id)
    .then(() =>
      res.status(200).json({ message: "Profil supprimé avec succès" })
    )
    .catch((error) => res.status(400).json({ error }));
};
