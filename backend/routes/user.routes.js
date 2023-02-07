const router = require("express").Router();

//importation des middlewares
const password = require("../middleware/password");
const checkEmail = require("../middleware/checkEmail");

//importation des controllers
const userCtrl = require("../controllers/user.controller");

//importation des routes auth
router.post("/signup", checkEmail, password, userCtrl.signup);
router.post("/login", userCtrl.login);
router.delete("/delete/:id", userCtrl.deleteCompte);

module.exports = router;
