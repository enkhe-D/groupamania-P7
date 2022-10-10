//importation des packages
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

/*-----GET - ALL---*/
module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ err });
  }
};

/*-----GET - ONE---*/
module.exports.getOneUser = async (req, res) => {
  try {
    const users = await UserModel.findById({ _id: req.params.id }).select(
      "-password"
    );
    return res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ err });
  }
};

/*-----PUT---*/
module.exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("identifiant inconnue: " + req.params.id);

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .then((docs) => {
        return res.send(docs);
      })
      .catch((err) => {
        return res.status(500).json({ message: err });
      });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

/*-----DELETE---*/

module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown: " + req.params.id);

  try {
    await UserModel.deleteOne({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted. " });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

/*-----PATCH---- follow-----*/
module.exports.follow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToFollow)
  )
    return res.status(400).send("ID unknown: " + req.params.id);
  try {
    // add to the follower list
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { following: req.body.idToFollow } },
      { new: true, upsert: true }
    )
      .then((docs) => {
        if (docs === null) {
          throw new Error("error");
        }
        res.send(docs);
      })
      .catch((err) => {
        return res.status(500).json({ message: err });
      });

    // add to following list
    await UserModel.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      { new: true, upsert: true }
    )
      .then((docs) => {
        if (docs === null) {
          throw new Error("error");
        }
        res.send(docs);
      })
      .catch((err) => {
        return res.status(500).json({ message: err });
      });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

/*-----PATCH---- unfollow-----*/
module.exports.unfollow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToUnfollow)
  )
    return res.status(400).send("ID unknown: " + req.params.id);
  try {
    // remove from to the follower list
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { following: req.body.idToUnfollow } },
      { new: true, upsert: true }
    )
      .then((docs) => {
        return res.send(docs);
      })
      .catch((err) => {
        return res.status(400).json({ err });
      });

    // remove to following list
    await UserModel.findByIdAndUpdate(
      req.body.idToUnfollow,
      { $pull: { followers: req.params.id } },
      { new: true, upsert: true }
    )
      .then((docs) => {
        return res.send(docs);
      })
      .catch((err) => {
        return res.status(400).json({ err });
      });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
