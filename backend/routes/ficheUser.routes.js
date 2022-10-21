const router = require("express").Router();

const multer = require("../middelware/multer");

const ficheUserController = require("../controllers/ficheUser.controller");
const auth = require("../middelware/auth.middleware");

router.post("/", auth, multer, ficheUserController.createFicheUser);
router.get("/", auth, ficheUserController.getAllUsers);
router.get("/:id", auth, ficheUserController.getOneUser);
router.put("/:id", auth, multer, ficheUserController.updateUser);
router.delete("/:id", auth, ficheUserController.deleteUser);

module.exports = router;
