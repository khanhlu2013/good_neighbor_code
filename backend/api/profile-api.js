const route = require("express").Router();
const mongoose = require("mongoose");

const Connection = require("../model/connection");
const Post = require("../model/post");
const User = require("../model/user");
const Share = require("../model/share");
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
    const userToAdd = await User.findById(userIdToAdd);
    const connection = await new Connection({
      from: user,
      to: userToAdd
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
      connection.isApproveByFrom = isApproved;
    } else {
      connection.isApproveByTo = isApproved;
    }
    return res.send(await connection.save());
  })().catch(next);
});

// - post ----
route.post("/createPost", authCheck, (req, res, next) => {
  const { user } = req;
  const { title, description, isActive } = req.body;
  (async () => {
    const post = new Post({
      user,
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
    if (!post.user.equals(user._id)) {
      return res.status(401).send();
    }

    Object.assign(post, { title, description, isActive });
    await post.save();
    res.send(post);
  })().catch(next);
});

route.post("/awareReturnPost", authCheck, (req, res, next) => {
  const { user } = req;
  const { postId } = req.body;

  (async () => {
    if (!postId) {
      throw Error("post id is null");
    }

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      throw Error("post id is in valid");
    }

    const post = await Post.findById(postId);
    if (!post) {
      throw Error("cant find postId");
    }
    if (!post.user.equals(user._id)) {
      throw Error("unauthorize action");
    }

    await Share.update(
      { post: postId, isReturn: true },
      { isAwareReturn: true },
      { multi: true }
    );

    res.send();
  })().catch(next);
});

route.get("/outPosts", authCheck, (req, res, next) => {
  const { user } = req;
  (async () => {
    const posts = await Post.findOutPosts(user);
    res.send(posts);
  })().catch(next);
});

route.get("/inPosts", authCheck, (req, res, next) => {
  const { user } = req;
  (async () => {
    const inPosts = await Post.findInPosts(user);
    res.send(inPosts);
  })().catch(next);
});

route.post("/createShare", authCheck, (req, res, next) => {
  const { user } = req;
  const { postID } = req.body;

  if (!mongoose.Types.ObjectId.isValid(postID)) {
    return res.status(400).send();
  }

  (async () => {
    const share = new Share({
      post: postID,
      borrower: user._id
    });
    await share.save();
    res.send(share);
  })().catch(next);
});

route.post("/deleteShare", authCheck, (req, res, next) => {
  const { user } = req;
  const { shareID } = req.body;

  if (!mongoose.Types.ObjectId.isValid(shareID)) {
    return res.status(400).send();
  }

  (async () => {
    const share = await Share.findById(shareID);
    if (!share) {
      return res.status(400).send();
    }

    if (!share.borrower.equals(user._id)) {
      return res.status(401).send();
    }

    await share.remove();
    res.send();
  })().catch(next);
});

route.post("/returnShare", authCheck, (req, res, next) => {
  const { user } = req;
  const { shareID } = req.body;

  if (!mongoose.Types.ObjectId.isValid(shareID)) {
    throw Error("Invalid shareID");
  }

  (async () => {
    const share = await Share.findById(shareID);
    if (!share) {
      throw Error("Can not find ShareID");
    }

    if (!share.borrower.equals(user._id)) {
      throw Error("Unauthorized access");
    }

    share.isReturn = true;
    share.dateReturn = new Date();
    await share.save();
    res.send(share);
  })().catch(next);
});

route.post("/awareApproveShare", authCheck, (req, res, next) => {
  const { user } = req;
  const { shareId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(shareId)) {
    throw Error("Invalid shareId");
  }

  (async () => {
    const share = await Share.findById(shareId);
    if (!share) {
      throw Error("Can not find shareId");
    }

    if (!share.borrower.equals(user._id)) {
      throw Error("Unauthorized access");
    }

    share.isAwareApprove = true;
    await share.save();
    res.send(share);
  })().catch(next);
});

route.post("/approveShare", authCheck, (req, res, next) => {
  const { user } = req;
  const { shareID, isApprove } = req.body;

  if (!mongoose.Types.ObjectId.isValid(shareID)) {
    throw Error("ShareID is not valid");
  }

  (async () => {
    const share = await Share.findById(shareID).populate("post");
    if (!share) {
      throw Error(`ShareID ${shareID} is not found`);
    }

    if (share.isReturn === true) {
      throw Error("Share is finalized. Update outShare is not allow");
    }

    if (!share.post.user.equals(user._id)) {
      throw Error("Unauthorized access");
    }

    share.isApprove = isApprove;
    await share.save();
    res.send(share);
  })().catch(next);
});

module.exports = route;
