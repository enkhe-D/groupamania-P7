const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    //récupération du token
    const token = req.headers.authorization.split(" ")[1];

    //décoder le token
    const decodedToken = jwt.verify(token, `${process.env.JWT_TOKEN_SECRET}`);

    //récupération du userId
    const userId = decodedToken.userId;

    userIdParamsUrl = req.originalUrl.split("=")[1];

    if (req._body === true) {
      //controle BODY RAW
      console.log("-----> req.body: TRUE-------");
      if (req.body.userId === userId) {
        next();
      } else {
        console.log("---->ERREUR auth body raw");
        throw "Erreur identification userId";
      }
      //control FORM DATA
    } else if (userIdParamsUrl === userId) {
      next();
    } else {
      throw "ERREUR identification form-data";
    }
  } catch (error) {
    res.status(401).json({
      message: "Echec authentification dans le AUTH",
      error: error,
    });
  }
};
