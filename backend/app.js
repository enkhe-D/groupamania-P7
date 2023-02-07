//importation des packages
const express = require("express");
const mongoose = require("./config/db");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const cors = require("cors");

//debug
app.use(morgan("dev"));
mongoose.set("debug", true);

//cors
app.use(
  cors({
    origin: `${process.env.CLIENT_URL}`,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTION", "HEAD"],
    allowedHeaders:
      "Origin, X-Requested-With,x-access-token, Content, Accept, Content-Type, Authorization",
  })
);

//importation des routes
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");

// analysateur
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
