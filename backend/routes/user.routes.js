//importation des dépendances
const router = require("express").Router();
const multer = require("multer");
const upload = multer();

//importation des controllers
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");
const uploadController = require("../controllers/upload.controller");

//authentification
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

//user
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getOneUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);

//upload image
router.post("/upload", upload.single("file"), uploadController.uploadProfil);

module.exports = router;
