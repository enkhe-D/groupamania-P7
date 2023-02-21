const Post = require("../models/Post.model");

exports.commentPost = (req, res) => {
  Post.findByIdAndUpdate(req.params.id)
    .then()
    .catch((error) => res.status(400).json({ error }));
};

exports.editCommentPost = (req, res) => {
  Post.findByIdAndUpdate(req.params.id)
    .then()
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteCommentPost = (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json({ message: "commentaire supprimé" }))
    .catch((error) => res.status(400).json({ error }));
};
