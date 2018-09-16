import { API_URL } from "./api-url";
import { Post } from "../model/post";
import { User } from "../model/user";
import { Connection } from "../model/connection";
import { Share } from "../model/share";

const profile = async () => {
  const request = await fetch(API_URL("profile"), {
    credentials: "include"
  });
  if (request.status === 401) {
    return null;
  }
  const { _id: id, email, name } = await request.json();
  return new User(id, email, name);
};

const searchEmail = async searchedEmail => {
  const json = await get("profile.searchEmail", {
    email: searchedEmail
  });
  if (!json) return null;

  const { _id: id, email, name } = json;
  return new User(id, email, name);
};

// - connection
const connections = async () => {
  const raws = await get("profile.connections", {});
  return raws.map(raw => {
    const {
      _id: id,
      from: { _id: fromID, email: fromEmail, name: fromName },
      to: { _id: toID, email: toEmail, name: toName },
      approvedByTo,
      approvedByFrom
    } = raw;

    const from = new User(fromID, fromEmail, fromName);
    const to = new User(toID, toEmail, toName);

    return new Connection(id, from, to, approvedByTo, approvedByFrom);
  });
};

const createConnection = async userIdToAdd => {
  await post("profile.createConnection", {
    userIdToAdd
  });
};

const updateConnection = async (connectionId, isApproved) => {
  await post("profile.updateConnection", {
    connectionId,
    isApproved
  });
};

// - post
const createPost = async (title, description, isActive) => {
  const {
    _id: createdId,
    isActive: createdIsActive,
    title: createdTitle,
    description: createdDescription,
    dateCreated: createdDateCreated
  } = await post("profile.createPost", {
    title,
    description,
    isActive
  });

  return {
    createdId,
    createdIsActive,
    createdTitle,
    createdDescription,
    createdDateCreated
  };
};

const updatePost = async (postID, title, description, isActive) => {
  const {
    title: updatedTitle,
    description: updatedDescription,
    isActive: updatedIsActive
  } = await post("profile.updatePost", {
    postID,
    title,
    description,
    isActive
  });

  return {
    updatedTitle,
    updatedDescription,
    updatedIsActive
  };
};

// - outPost
const outPosts = async () => {
  const postsRaw = await get("profile.outPosts", {});
  return processPostsRawData(postsRaw);
};

// - inPost
const inPosts = async () => {
  const postsRaw = await get("profile.inPosts", {}); //inPosts <-> [{user,post,shares}, ...]
  return processPostsRawData(postsRaw);
};

// -  share
const createShare = async postID => {
  await post("profile.createShare", {
    postID
  });
};

const deleteShare = async shareID => {
  await post("profile.deleteShare", { shareID });
};

const updateOutShare = async (shareID, isApprove) => {
  const { isApprovedByFrom: decidedIsApprovedByFrom } = await post(
    "profile.updateOutShare",
    {
      shareID,
      isApprove
    }
  );

  return decidedIsApprovedByFrom;
};

const updateInShare = async (shareID, isReturnedByTo) => {
  await post("profile.updateInShare", {
    shareID,
    isReturnedByTo
  });
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

function processPostsRawData(postsRaw) {
  return postsRaw.map(raw => {
    const { post: postRaw, user: userRaw } = raw;
    const sharesRaw = raw.shares.filter(share => share._id !== undefined);

    const shares = sharesRaw.map(shareRaw => {
      const { _id: userId, email, name } = shareRaw.borrower;
      const borrower = new User(userId, email, name);
      return new Share(
        shareRaw._id,
        borrower,
        shareRaw.dateCreated,
        shareRaw.isApprovedByFrom,
        shareRaw.isReturnedByTo
      );
    });
    const post = new Post(
      postRaw._id,
      userRaw,
      postRaw.isActive,
      postRaw.title,
      postRaw.description,
      postRaw.dateCreated,
      shares
    );
    for (const share of post.shares) {
      share.setPost(post);
    }
    return post;
  });
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
  deleteShare,
  updateOutShare,
  updateInShare
};
export { API };
