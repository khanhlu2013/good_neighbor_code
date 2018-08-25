const route = require("express").Router();
const mongoose = require("mongoose");

const Connection = require("../models/connection");
const Post = require("../models/post");
const User = require("../models/user");
const keys = require("../configs/keys");

// - auth ----
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

// - user ----
route.get("/searchEmail", authCheck, (req, res, next) => {
  const { email } = req.query;
  const { user } = req;

  if (!email) {
    return res.status(400).send();
  }

  if (email === user.email) {
    return res.status(400).send();
  }

  (async () => {
    res.send(await User.findOne({ email }));
  })().catch(next);
});

// - connection ----
route.post("/createConnection", authCheck, (req, res, next) => {
  const { user } = req;
  const { userIdToAdd } = req.body;

  if (!userIdToAdd) {
    return res.status(400).send();
  }

  if (!mongoose.Types.ObjectId.isValid(userIdToAdd)) {
    return res.status(400).send();
  }

  (async () => {
    const connection = await new Connection({
      from: user.id,
      to: userIdToAdd
    }).save();
    return res.send(connection);
  })().catch(next);
});

route.post("/modifyConnection", authCheck, (req, res, next) => {
  const { user } = req;
  const { connectionId, isApproved } = req.body;

  if (connectionId === undefined || isApproved === undefined) {
    return res.status(400).send();
  }

  if (!mongoose.Types.ObjectId.isValid(connectionId)) {
    return res.status(400).send();
  }
  (async () => {
    const connection = await Connection.findById(connectionId);
    if (connection.from.equals(user._id)) {
      connection.approvedByFrom = isApproved;
    } else {
      connection.approvedByTo = isApproved;
    }
    return res.send(await connection.save());
  })().catch(next);
});

route.get("/connections", authCheck, (req, res, next) => {
  const { user } = req;
  (async () => {
    const connections = await Connection.find({
      $or: [{ from: user }, { to: user }]
    })
      .populate("from")
      .populate("to");
    res.send(connections);
  })().catch(next);
});

// - post ----
route.get("/posts", authCheck, (req, res, next) => {
  const { user } = req;
  (async () => {
    const posts = await Post.find({
      user
    });

    res.send(posts);
  })().catch(next);
});

route.post("/createPost", authCheck, (req, res, next) => {
  const { user } = req;
  const { title, description } = req.body;

  (async () => {
    const post = new Post({
      user: user.id,
      title: title,
      description: description
    });
    await post.save();
    res.send(post);
  })().catch(next);
});

route.post("/updatePost", authCheck, (req, res, next) => {
  const { user } = req;
  const { postID, title, description } = req.body;

  (async () => {
    if (!postID) {
      return res.status(400).send();
    }

    if (!mongoose.Types.ObjectId.isValid(postID)) {
      return res.status(400).send();
    }

    const post = await Post.findById(postID);
    if (!post) {
      return res.status(400).send();
    }

    if (post.user != user._id) {
      return res.status(401).send();
    }

    Object.assign(post, { title, description });
    await post.save();
    res.send(post);
  })().catch(next);
});

module.exports = route;
