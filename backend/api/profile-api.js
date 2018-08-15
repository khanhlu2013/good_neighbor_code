const route = require("express").Router();
const mongoose = require("mongoose");

const Connection = require("../models/connection");
const User = require("../models/user");
const keys = require("../configs/keys");

const authCheck = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send();
  }
  next();
};

route.get("/logout", authCheck, (req, res) => {
  req.logout();
  res.redirect(keys.FRONTEND_URL);
});

route.get("/", authCheck, (req, res) => {
  res.send(req.user);
});

route.get("/searchEmail", authCheck, (req, res) => {
  const { email } = req.query;
  const { user } = req;

  if (!email) {
    return res.status(400).send();
  }

  if (email === user.email) {
    return res.status(400).send();
  }

  (async () => {
    const searchedUser = await User.findOne({ email });
    const connection = await Connection.findConnection(user, searchedUser);
    res.send({ user: searchedUser, connection });
  })().catch(err => {
    console.log(err);
    res.status(500).send();
  });
});

route.post("/createConnection", authCheck, async (req, res) => {
  const { user } = req;
  const { userIdToAdd } = req.body;

  if (!userIdToAdd) {
    return res.status(400).send();
  }

  if (!mongoose.Types.ObjectId.isValid(userIdToAdd)) {
    return res.status(400).send();
  }

  try {
    const connection = await new Connection({
      from: user.id,
      to: userIdToAdd
    }).save();
    return res.send(connection);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

route.post("/modifyConnection", authCheck, async (req, res) => {
  const { user } = req;
  const { connectionId, isApproved } = req.body;

  if (connectionId === undefined || isApproved === undefined) {
    return res.status(400).send();
  }

  if (!mongoose.Types.ObjectId.isValid(connectionId)) {
    return res.status(400).send();
  }
  try {
    const connection = await Connection.findById(connectionId);
    if (connection.from.equals(user._id)) {
      connection.approvedByFrom = isApproved;
    } else {
      connection.approvedByTo = isApproved;
    }
    return res.send(await connection.save());
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

route.get("/connections", authCheck, (req, res) => {
  const { user } = req;
  (async () => {
    const friends = await Connection.find({
      $or: [{ from: user }, { to: user }]
    })
      .populate("from")
      .populate("to");

    res.send(friends);
  })().catch(e => {
    console.log(e);
    res.status(500).send();
  });
});

module.exports = route;
