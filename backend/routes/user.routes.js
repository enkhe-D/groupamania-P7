const router = require("express").Router();

//importation des middlewares
const password = require("../middleware/password");
const checkEmail = require("../middleware/checkEmail");
const auth = require("../middleware/auth.middleware");

//importation des controllers
const userCtrl = require("../controllers/user.controller");
const profilCtrl = require("../controllers/profil.controller");

//importation des routes auth
router.post("/register", checkEmail, password, userCtrl.register);
router.post("/login", userCtrl.login);

//route Profil
router.get("/", auth, profilCtrl.getAllProfils);
router.get("/:id", auth, profilCtrl.getOneProfil);
router.put("/:id", auth, profilCtrl.updateProfil);
router.delete("/:id", auth, profilCtrl.deleteProfil);

module.exports = router;
