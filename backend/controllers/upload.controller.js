const UserModel = require("../models/user.model");
//const fs = require("fs");
const { uploadErrors } = require("../utils/errors.utils");
//const { promisify } = require("util");
//const pipeline = promisify(require("stream").pipeline);
const sharp = require("sharp");

module.exports.uploadProfil = async (req, res) => {
  const fileName = req.body.name + ".jpg";

  try {
    if (
      req.file.detectedMimeType === "image/jpg" &&
      req.file.detectedMimeType === "image/jpeg" &&
      req.file.detectedMimeType === "image/png"
    )
      throw Error("Fichier invalide");

    if (req.file.size > 500000) throw Error("max size");
  } catch (err) {
    const errors = uploadErrors(err);
    return res.status(201).json({ errors });
  }

  try {
    await sharp(req.file.buffer)
      .resize({ width: 150, height: 150 })
      .toFile(`${__dirname}/../client/public/uploads/profil/${fileName}`);
    res.status(201).send("Profil mise a jour");
  } catch (err) {
    res.status(400).send(err);
  }

  // try {
  //   await UserModel.findByIdAndUpdate(
  //     req.body.userId,
  //     { $set: { picture: "./uploads/profil/" + fileName } },
  //     { new: true, upsert: true, setDefaultOnInsert: true },
  //     (err, docs) => {
  //       if (!err) return res.send(docs);
  //       else return res.status(500).send({ message: err });
  //     }
  //   );
  // } catch (err) {
  //   return res.status(500).send({ message: err });
  // }
};
