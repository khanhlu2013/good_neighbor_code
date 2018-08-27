const route = require("express").Router();
const mongoose = require("mongoose");

const Connection = require("../models/connection");
const Post = require("../models/post");
const User = require("../models/user");
const ShareLog = require("../models/shareLog");
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

route.post("/updateConnection", authCheck, (req, res, next) => {
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

// - post ----
route.get("/outPosts", authCheck, (req, res, next) => {
  const { user } = req;
  const { isActive } = req.query;
  (async () => {
    const query = {
      by: user
    };
    if (isActive) {
      query.isActive = isActive;
    }
    const posts = await Post.find(query);

    res.send(posts);
  })().catch(next);
});

route.post("/createPost", authCheck, (req, res, next) => {
  const { user } = req;
  const { title, description } = req.body;
  (async () => {
    const post = new Post({
      by: user,
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

    if (post.by.equal(user._id)) {
      return res.status(401).send();
    }

    Object.assign(post, { title, description });
    await post.save();
    res.send(post);
  })().catch(next);
});

route.get("/browsePosts", authCheck, (req, res, next) => {
  const { user } = req;
  const { isActive } = req.query;
  (async () => {
    const query = {
      by: user
    };
    if (isActive) {
      query.isActive = isActive;
    }
    const posts = await Post.find(query);

    res.send(posts);
  })().catch(next);
});

// - shareLog
route.get("/shareLogs", authCheck, (req, res, next) => {
  const { isIn, isOut } = req.query;
  const { user } = req;

  if (!isIn && !isOut) {
    return res.status(400).send();
  }
  const query = {};
  if (isIn) {
    query.isIn = isIn;
  }
  if (isOut) {
    query.isOut = isOut;
  }

  (async () => {
    const shareLogs = await ShareLog.find(query);
    res.send(shareLogs);
  })().catch(next);
});

route.post("/createShareLog", authCheck, (req, res, next) => {
  const { user } = req;
  const { postID } = req.body;

  if (!mongoose.Types.ObjectId.isValid(postID)) {
    return res.status(400).send();
  }

  (async () => {
    const shareLog = new ShareLog({
      post: postID,
      borrower: user.id
    });
    await post.shareLog().save();
    res.send(shareLog);
  })().catch(next);
});

route.post("/updateInShareLog", authCheck, (req, res, next) => {
  const { user } = req;
  const { shareLogID, isReturning } = req.body;

  if (!mongoose.Types.ObjectId.isValid(shareLogID)) {
    return res.status(400).send();
  }

  (async () => {
    const shareLog = await ShareLog.findById(shareLogID);
    if (!shareLog) {
      return res.status(400).send();
    }

    if (!shareLog.borrower.equal(user._id)) {
      return res.status(401).send();
    }

    shareLog.isReturning = isReturning;
    await shareLog.save();
    res.send(shareLog);
  })().catch(next);
});

route.post("/updateOutShareLog", authCheck, (req, res, next) => {
  const { user } = req;
  const { shareLogID, isReturned } = req.body;

  if (!mongoose.Types.ObjectId.isValid(shareLogID)) {
    return res.status(400).send();
  }

  (async () => {
    const shareLog = await ShareLog.findById(shareLogID).populate("post");
    if (!shareLog) {
      return res.status(400).send();
    }

    if (!shareLog.post.by.equal(user._id)) {
      return res.status(401).send();
    }

    shareLog.isReturned = isReturned;
    await shareLog.save();
    res.send(shareLog);
  })().catch(next);
});

module.exports = route;
