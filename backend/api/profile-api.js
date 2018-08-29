const route = require("express").Router();
const mongoose = require("mongoose");

const Connection = require("../models/connection");
const Post = require("../models/post");
const User = require("../models/user");
const Share = require("../models/share");
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
    const connections = await Connection.findMyConnections(user);
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
  const { title, description, isActive } = req.body;
  (async () => {
    const post = new Post({
      by: user,
      title,
      description,
      isActive
    });
    await post.save();
    res.send(post);
  })().catch(next);
});

route.post("/updatePost", authCheck, (req, res, next) => {
  const { user } = req;
  const { postID, title, description, isActive } = req.body;

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
    if (!post.by.equals(user._id)) {
      return res.status(401).send();
    }

    Object.assign(post, { title, description, isActive });
    await post.save();
    res.send(post);
  })().catch(next);
});

route.get("/inPosts", authCheck, (req, res, next) => {
  const { user } = req;
  (async () => {})().catch(next);
});

// - share
// route.get("/share", authCheck, (req, res, next) => {
//   const { isIn, isOut } = req.query;
//   const { user } = req;

//   if (!isIn && !isOut) {
//     return res.status(400).send();
//   }
//   const query = {};
//   if (isIn) {
//     query.isIn = isIn;
//   }
//   if (isOut) {
//     query.isOut = isOut;
//   }

//   (async () => {
//     const shares = await Share.find(query);
//     res.send(shares);
//   })().catch(next);
// });

route.post("/createShare", authCheck, (req, res, next) => {
  const { user } = req;
  const { postID } = req.body;

  if (!mongoose.Types.ObjectId.isValid(postID)) {
    return res.status(400).send();
  }

  (async () => {
    const share = new Share({
      post: postID,
      borrower: user.id
    });
    await post.share().save();
    res.send(share);
  })().catch(next);
});

route.post("/updateInShare", authCheck, (req, res, next) => {
  const { user } = req;
  const { shareID, isReturning } = req.body;

  if (!mongoose.Types.ObjectId.isValid(shareID)) {
    return res.status(400).send();
  }

  (async () => {
    const share = await Share.findById(shareID);
    if (!share) {
      return res.status(400).send();
    }

    if (!share.borrower.equal(user._id)) {
      return res.status(401).send();
    }

    share.isReturning = isReturning;
    await share.save();
    res.send(share);
  })().catch(next);
});

route.post("/updateOutShare", authCheck, (req, res, next) => {
  const { user } = req;
  const { shareID, isReturned } = req.body;

  if (!mongoose.Types.ObjectId.isValid(shareID)) {
    return res.status(400).send();
  }

  (async () => {
    const share = await Share.findById(shareID).populate("post");
    if (!share) {
      return res.status(400).send();
    }

    if (!share.post.by.equal(user._id)) {
      return res.status(401).send();
    }

    share.isReturned = isReturned;
    await share.save();
    res.send(share);
  })().catch(next);
});

module.exports = route;
