const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, `${process.env.TOKEN_SECRET}`);
    console.log("----decodedToken-----");
    console.log(decodedToken);

    const userId = decodedToken.userId;
    console.log("----userId--decodedToken---");
    console.log(userId);

    console.log("----req.body.userId---");
    console.log(req.body.ficheUser.userId);

    req.auth = { userId };

    if (req.body === decodedToken) {
      throw "UserId non valide";
    } else {
      next();
    }
  } catch (err) {
    res.status(401).json({ err });
  }
};
