const Post = require("../models/Post.model");
const User = require("../models/User.model");
const fs = require("fs");

// CREATE POST
// exports.createPost = (req, res) => {
//   const post = new Post({
//     ...JSON.parse(req.body.post),
//     userId: req.auth.userId,
//     imageUrl: `${req.protocol}://${req.get("host")}/images/${
//       req.file.filename
//     }`,
//   });

//   post
//     .save()
//     .then((post) => res.status(201).json({ message: "Post enregistré", post }))
//     .catch((error) =>
//       res.status(400).json({ message: "probleme pour save", error })
//     );
// };

exports.createPost = (req, res) => {
  const newPost = new Post({
    userId: req.body.userId,
    message: req.body.message,
    video: req.body.video,
    likers: [],
    comments: [],
  });

  newPost
    .save()
    .then((post) => res.status(201).json({ message: "Post créée!", post }))
    .catch((error) => res.status(400).json({ error }));
};

// READ ALL POSTS
// exports.readAllPost = (req, res) => {
//   Post.find()
//     .then((posts) => res.status(200).json({ posts }))
//     .catch((error) =>
//       res
//         .status(200)
//         .json({ message: "erreur pour récup les posts", error: error })
//     );
// };

exports.readAllPost = (req, res) => {
  Post.find()
    .then((posts) => res.status(200).json({ posts }))
    .catch((error) => res.status(400).json({ error }));
};

// READ ONE POST
// exports.readOnePost = (req, res) => {
//   console.log(req.params.id);

//   Post.findById(req.params.id)
//     .then((post) => {
//       if (post.userId != req.auth.userId) {
//         res.status(401).json({ message: "action non autorisée" });
//       } else {
//         res.status(200).json({ post });
//       }
//     })
//     .catch((error) =>
//       res.status(400).json({ message: "Post pas trouvé", error })
//     );
// };

exports.readOnePost = (req, res) => {
  console.log(req.params.id);

  Post.findById(req.params.id)
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

// UPDATE POST
// exports.updatePost = (req, res) => {
//   const postObject = req.file
//     ? {
//         ...JSON.parse(req.body.post),
//         imageUrl: `${req.protocol}://${req.get("host")}/images/${
//           req.file.filename
//         }`,
//       }
//     : { ...req.body };

//   delete postObject._userId;

//   Post.findByIdAndUpdate(req.params.id)
//     .then((post) => {
//       if (post.userId != req.auth.userId) {
//         res.status(401).json({ message: "action non autorisée" });
//       } else {
//         if (req.file) {
//           const filename = post.imageUrl.split("/images/")[1];
//           fs.unlink(`images/${filename}`, () => {
//             Post.updateOne(req.params.id, { ...postObject })
//               .then(() =>
//                 res
//                   .status(200)
//                   .json({ message: "post mise a jour sans l image" })
//               )
//               .catch((error) => res.status(401).json({ error }));
//           });
//         } else {
//           console.log("-----else postObject--------");
//           console.log(postObject);

//           Post.findByIdAndUpdate(req.params.id, { ...postObject })
//             .then(() =>
//               res.status(200).json({ message: "post update without image" })
//             )
//             .catch((error) => res.status(401).json({ error }));
//         }
//       }
//     })
//     .catch((error) => res.status(400).json({ error }));
// };

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

  Post.findByIdAndUpdate(req.params.id)
    .then((post) => {
      if (post.userId != req.auth.userId) {
        res.status(401).json({ message: "action non autorisée" });
      } else {
        if (req.file) {
          const filename = post.imageUrl.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {
            Post.updateOne(req.params.id, { ...postObject })
              .then(() =>
                res
                  .status(200)
                  .json({ message: "post mise a jour sans l image" })
              )
              .catch((error) => res.status(401).json({ error }));
          });
        } else {
          console.log("-----else postObject--------");
          console.log(postObject);

          Post.findByIdAndUpdate(req.params.id, { ...postObject })
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
// exports.deletePost = (req, res) => {
//   Post.findByIdAndRemove(req.params.id)
//     .then((post) => {
//       if (post.userId != req.auth.userId) {
//         res.status(401).json({ message: "action non autorisée" });
//       } else {
//         const filename = post.imageUrl.split("/images/")[1];
//         fs.unlink(`images/${filename}`, () => {
//           Post.deleteOne({ _id: req.params.id })
//             .then(() => res.status(200).json({ message: "Post supprimé" }))
//             .catch((error) => res.status(400).json({ error }));
//         });
//       }
//     })
//     .catch((error) => res.status(500).json({ error }));
// };

exports.deletePost = (req, res) => {
  Post.findByIdAndRemove(req.params.id)
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
