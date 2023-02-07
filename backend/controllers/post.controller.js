const Post = require("../models/Post.model");
const fs = require("fs");

// CREATE POST
exports.createPost = (req, res) => {
  const post = new Post({
    ...JSON.parse(req.body.post),
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });

  post
    .save()
    .then((post) => res.status(201).json({ message: "Post enregistré", post }))
    .catch((error) =>
      res.status(400).json({ message: "probleme pour save", error })
    );
};

// READ ALL POSTS
exports.readAllPost = (req, res) => {
  Post.find()
    .then((posts) => res.status(200).json({ posts }))
    .catch((error) =>
      res
        .status(200)
        .json({ message: "erreur pour récup les posts", error: error })
    );
};

// READ ONE POST
exports.readOnePost = (req, res) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (post.userId != req.auth.userId) {
        res.status(401).json({ message: "action non autorisée" });
      } else {
        res.status(200).json({ post });
      }
    })
    .catch((error) =>
      res.status(400).json({ message: "Post pas trouvé", error })
    );
};

exports.updatePost = (req, res) => {
  const postObject = req.file
    ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete postObject._userId;

  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (post.userId != req.auth.userId) {
        res.status(401).json({ message: "action non autorisée" });
      } else {
        if (req.file) {
          const filename = post.imageUrl.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {
            Post.updateOne(
              { _id: req.params.id },
              { ...postObject, _id: req.params.id }
            )
              .then(() =>
                res.status(200).json({ message: "post update with image" })
              )
              .catch((error) => res.status(401).json({ error }));
          });
        } else {
          Post.updateOne(
            { _id: req.params.id },
            { ...postObject, _id: req.params.id }
          )
            .then(() =>
              res.status(200).json({ message: "post update without image" })
            )
            .catch((error) => res.status(401).json({ error }));
        }
      }
    })
    .catch((error) => res.status(400).json({ error }));
};

//DELETE POST
exports.deletePost = (req, res) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (post.userId != req.auth.userId) {
        res.status(401).json({ message: "action non autorisée" });
      } else {
        const filename = post.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Post.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: "Post supprimé" }))
            .catch((error) => res.status(400).json({ error }));
        });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
