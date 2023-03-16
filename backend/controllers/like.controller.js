const Post = require("../models/Post.model");

exports.postLike = (req, res) => {
  Post.findById(req.params.id)
    .then((postObject) => {
      switch (req.body.like) {
        // LIKE
        case 1:
          if (
            !postObject.usersLiked.includes(req.body.userId) &&
            req.body.like === 1
          ) {
            Post.findByIdAndUpdate(req.params.id, {
              $inc: { likes: 1 },
              $push: { usersLiked: req.body.userId },
            })
              .then(() => res.status(201).json({ message: "liked" }))
              .catch((error) => res.status(400).json({ error }));
          }
          break;

        // DISLIKE
        case -1:
          if (
            !postObject.usersDisliked.includes(req.body.userId) &&
            req.body.like === -1
          ) {
            Post.findByIdAndUpdate(req.params.id, {
              $inc: { dislikes: 1 },
              $push: { usersDisliked: req.body.userId },
            })
              .then(() => res.status(200).json({ message: "disliked" }))
              .catch((error) => res.status(400).json({ error }));
          }
          break;

        // NEUTRE
        case 0:
          if (postObject.usersLiked.includes(req.body.userId)) {
            Post.findByIdAndUpdate(req.params.id, {
              $inc: { likes: -1 },
              $pull: { usersLiked: req.body.userId },
            })
              .then(() => res.status(200).json({ message: "neutre" }))
              .catch((error) => res.status(400).json({ error }));
          }

          if (postObject.usersDisliked.includes(req.body.userId)) {
            Post.findByIdAndUpdate(req.params.id, {
              $inc: { dislikes: -1 },
              $pull: { usersDisliked: req.body.userId },
            })
              .then(() => res.status(200).json({ message: "neutre" }))
              .catch((error) => res.status(400).json({ error }));
          }
          break;
      }
    })

    .catch((error) => res.status(404).json({ error }));
};
