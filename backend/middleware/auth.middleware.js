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

    req.auth = {
      userId: userId,
    };

    if (req.body.userId && req.body.userId !== userId) {
      throw "ERREUR";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({
      message: "Echec authentification dans le AUTH-MIDDLEWARE",
      error: error,
    });
  }
};
