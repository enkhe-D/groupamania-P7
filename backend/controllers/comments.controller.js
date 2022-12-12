const { isReactive } = require("vue");
const Post = require("../models/Post.model");

//pster un comment
exports.commentPost = async (req, res) => {
  try {
    const postObject = await Post.findById({ _id: req.params.id });

    if (req.auth.userId === postObject.postId) {
      Post.findByIdAndUpdate(req.params.id, {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commentNom: req.body.commentNom,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      })
        .then(() => res.status(201).json({ message: "comment added" }))
        .catch((error) => res.status(400).json({ error }));
    } else {
      res.status(400).json({ message: "Vous n'etes pas autoriser" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

//edit un comment

exports.editCommentPost = async (req, res) => {
  try {
    // if (req.auth.userId === postObject.postId) {
    //   Post.findByIdAndUpdate(
    //     { _id: req.params.id },
    //     {
    //       $set: {
    //         text: req.body.text,
    //       },
    //     }
    //   );
    // } else {
    //   res.status(400).json({ message: "Vous n'etes pas autoriser" });
    // }
  } catch (error) {
    res.status(500).json({ error });
  }
};

//delete un comment
exports.deleteCommentPost = async (req, res) => {
  try {
    const postObject = await Post.findById({ _id: req.params.id });

    if (req.auth.userId === postObject.postId) {
      Post.findByIdAndUpdate(req.params.id, {
        $pull: {
          comments: {
            commenterId: req.body.commenterId,
          },
        },
      })
        .then(() => res.status(201).json({ message: "comment deleted" }))
        .catch((error) => res.status(400).json({ error }));
    } else {
      res.status(400).json({ message: "Vous n'etes pas autoriser" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
