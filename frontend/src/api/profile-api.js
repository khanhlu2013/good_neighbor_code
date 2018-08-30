import { API_URL } from "./api-url";
import { Post, Share } from "../models/post";

const profile = async () => {
  const request = await fetch(API_URL("profile"), {
    credentials: "include"
  });
  if (request.status === 401) {
    return null;
  }
  return await request.json();
};

const searchEmail = email => {
  return get("profile.searchEmail", { email });
};

// - connection
const connections = () => {
  return get("profile.connections", {});
};

const createConnection = userIdToAdd => {
  return post("profile.createConnection", {
    userIdToAdd
  });
};

const updateConnection = (connectionId, isApproved) => {
  return post("profile.updateConnection", {
    connectionId,
    isApproved
  });
};

// - post
const createPost = async (title, description, isActive) => {
  const crudedPost = await post("profile.createPost", {
    title,
    description,
    isActive
  });
  return crudedPost;
};

const updatePost = async (postID, title, description, isActive) => {
  const crudedPost = await post("profile.updatePost", {
    postID,
    title,
    description,
    isActive
  });
  return crudedPost;
};

// - outPost
const outPosts = async () => {
  return get("profile.outPosts", {});
};

// - inPost
const inPosts = async () => {
  const inPosts = await get("profile.inPosts", {}); //inPosts <-> [{user,posts}, ...]

  const unwindPosts2D = inPosts.map(inPost => {
    const array = inPost.posts.map(post => {
      return { post, user: inPost.user };
    });
    return array;
  });
  const unwindPosts1D = [].concat(...unwindPosts2D);
  return unwindPosts1D.map(raw => {
    const {
      post: postRaw,
      user: userRaw,
      post: { shares: sharesRaw }
    } = raw;
    const shares = sharesRaw.map(
      shareRaw =>
        new Share(
          shareRaw._id,
          shareRaw.borrower,
          shareRaw.dateCreated,
          shareRaw.isApprovedByFrom,
          shareRaw.isReturnedByTo
        )
    );
    return new Post(
      postRaw._id,
      userRaw,
      postRaw.isActive,
      postRaw.title,
      postRaw.description,
      postRaw.dateCreated,
      shares
    );
  });
};

// -  share
const createShare = async postID => {
  const share = await post("profile.createShare", {
    postID
  });
  return share;
};

const updateInShare = async (shareID, isReturning) => {
  const share = await post("profile.updateInShare", {
    shareID,
    isReturning
  });
  return share;
};

const updateOutShare = async (shareID, isReturned) => {
  const share = await post("profile.updateInShare", {
    shareID,
    isReturned
  });
  return share;
};

//- helper ----

async function getJSON(response) {
  const text = await response.text();
  if (!text) {
    return null;
  }
  return JSON.parse(text);
}

async function post(dottedPath, params) {
  const response = await fetch(API_URL(dottedPath), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params),
    credentials: "include"
  });

  return await getJSON(response);
}

async function get(dottedPath, params) {
  const url = API_URL(dottedPath, params);
  const response = await fetch(url, { credentials: "include" });
  return await getJSON(response);
}

//-------------

const API = {
  profile,
  searchEmail,
  //connection
  connections,
  createConnection,
  updateConnection,
  //post
  createPost,
  updatePost,
  outPosts,
  inPosts,
  //shares,
  createShare,
  updateInShare,
  updateOutShare
};
export { API };
