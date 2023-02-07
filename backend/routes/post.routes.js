const router = require("express").Router();

const auth = require("../middleware/auth.middleware");
const multer = require("../middleware/multer");

//import controller like
const { userLike } = require("../controllers/like.controller");

//import controller posts
const postCtrl = require("../controllers/post.controller");

//route posts
router.post("/", auth, multer, postCtrl.createPost);
router.get("/", auth, postCtrl.readAllPost);
router.get("/:id", auth, postCtrl.readOnePost);
router.put("/:id", auth, multer, postCtrl.updatePost);
router.delete("/:id", auth, multer, postCtrl.deletePost);

//route like
router.post("/like/:id", auth, userLike);

module.exports = router;
