//importation des dépendances
const router = require("express").Router();
const password = require("../middelware/password");
const multer = require("../middelware/multer");

//importation des controllers
const userController = require("../controllers/user.controller");

//authentification
router.post("/signup", password, userController.signup);
router.post("/login", userController.login);

module.exports = router;
