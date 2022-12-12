const router = require("express").Router();

//middleware
const password = require("../middleware/password");
const checkEmail = require("../middleware/checkEmail");

//controller
const userCtrl = require("../controllers/log.controller");

//routes
router.post("/signup", checkEmail, password, userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
