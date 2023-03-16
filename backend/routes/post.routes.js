const router = require("express").Router();

//importation des middleware
const auth = require("../middleware/auth.middleware");
const multer = require("../middleware/multer");

//importation du controller like
const { postLike } = require("../controllers/like.controller");

//importation controller comments
const {
  commentPost,
  editCommentPost,
  deleteCommentPost,
} = require("../controllers/comments.controller");

//import controller posts
const postCtrl = require("../controllers/post.controller");

//route posts
router.post("/", auth, multer, postCtrl.createPost);
router.get("/", auth, postCtrl.readAllPost);
router.get("/:id", auth, postCtrl.readOnePost);
router.put("/:id", auth, multer, postCtrl.updatePost);
router.delete("/:id", auth, multer, postCtrl.deletePost);

//route like
router.patch("/like-post/:id", auth, postLike);

router.patch("/comment-post/:id", commentPost);
router.patch("/edit-comment-post/:id", editCommentPost);
router.patch("/delete-comment-post/:id", deleteCommentPost);

module.exports = router;
