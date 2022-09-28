//variable d env
require("dotenv").config({ path: "./config/.env" });
require("./config/db");

//importation des packages
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { checkUser, requireAuth } = require("./middelware/auth.middleware");

//appel de l application
const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeader: ["sessionId", "Content-type"],
  exposedHeader: ["sessionId"],
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  preflightContinue: false,
};

app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  })
);

//body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//jwt
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

//routes
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");

//middelware
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

//ecouteur
app.listen(process.env.PORT, () => {
  console.log(`Listening on port: ${process.env.PORT}`);
});
