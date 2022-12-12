const Post = require("../models/Post.model");
const fs = require("fs");

// CREATE POST
exports.createPost = (req, res) => {
  const postObject = JSON.parse(req.body.post);

  const post = new Post({
    ...postObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });

  post
    .save()
    .then((post) => res.status(201).json({ message: "Post enregistré", post }))
    .catch((error) =>
      res.status(400).json({ message: "probleme pour save", error: error })
    );
};

// READ ALL POSTS
exports.readAllPost = (req, res) => {
  Post.find()
    .then((post) => res.status(200).json(post))
    .catch((error) =>
      res
        .status(200)
        .json({ message: "erreur pour récup les posts", error: error })
    );
};

// READ ONE POST
exports.readOnePost = (req, res) => {
  const idParams = { _id: req.params.id };

  Post.findOne(idParams)
    .then((post) => res.status(200).json(post))
    .catch((error) =>
      res.status(400).json({ message: "Post pas trouvé", error: error })
    );
};

exports.updatePost = (req, res) => {
  const idParams = { _id: req.params.id };

  if (req.file) {
    console.log("----req.file : TRUE");
    Post.findOne(idParams)
      .then((filePost) => {
        //récupération nom image a suppr
        const filename = filePost.imageUrl.split("/images")[1];

        //suppression de l image
        fs.unlink(`images/${filename}`, (error) => {
          if (error) throw error;
        });
      })
      .catch((error) =>
        res.status(404).json({ message: "PORBLEME REQ.FILE if", error: error })
      );
  } else {
    console.log("----req.file : FALSE");
  }

  const postObject = req.file
    ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  //mise a jour qui seront envoyé dans la bdd
  Post.updateOne(idParams, { ...postObject, idParams })
    .then(() => {
      res.status(200).json({ message: "Post mise a jour!" });
    })
    .catch((error) => res.status(404).json({ error }));
};

//DELETE POST
exports.deletePost = (req, res) => {
  const idParams = { _id: req.params.id };
  //chercher l objet a suppr
  Post.findOne(idParams)
    .then((filePost) => {
      const filename = filePost.imageUrl.split("/images/")[1];
      //suppression de l objet
      fs.unlink(`images/${filename}`, () => {
        Post.deleteOne(idParams)
          .then(() => res.status(200).json({ message: "Post supprimé" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
