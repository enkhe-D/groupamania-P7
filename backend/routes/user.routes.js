const router = require("express").Router();
const User = require("../models/User.model");

const userCtrl = require("../controllers/user.controler");

router.get("/:id", userCtrl.readOneProfil);
router.put("/:id", userCtrl.updateProfil);
router.delete("/:id", userCtrl.deleteProfil);

module.exports = router;
