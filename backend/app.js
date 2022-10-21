//importation des packages
const express = require("express");
const mongoose = require("./config/db");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

//debug
app.use(morgan("dev"));
mongoose.set("debug", true);

//importation des routes
const userRoutes = require("./routes/user.routes");
const ficheUserRoutes = require("./routes/ficheUser.routes");

//cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// analysateur
app.use(bodyParser.json());

// routes
app.use("/api/auth", userRoutes);
app.use("/api/fiche-user", ficheUserRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
