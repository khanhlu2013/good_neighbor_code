import { API_URL } from "./api-url";
import { Post } from "../model/post";
import { User } from "../model/user";
import { Share } from "../model/share";
import {
  constructConnectionsFromRaws,
  constructConnectionFromRaw
} from "./api-helper";

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
  return constructConnectionsFromRaws(raws);
};

const createConnection = async userIdToAdd => {
  const raw = await post("profile.createConnection", {
    userIdToAdd
  });
  return constructConnectionFromRaw(raw);
};

const updateConnection = async (connectionId, isApproved) => {
  const {
    approvedByTo: updatedApprovedByTo,
    approvedByFrom: updatedApprovedByFrom
  } = await post("profile.updateConnection", {
    connectionId,
    isApproved
  });
  return {
    updatedApprovedByTo,
    updatedApprovedByFrom
  };
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
  const {
    _id: createdShareId,
    dateCreated: createdDateCreated,
    isApprovedByFrom: createdIsApprovedByFrom,
    isReturnedByTo: createdIsReturnedByTo
  } = await post("profile.createShare", {
    postID
  });
  return {
    createdShareId,
    createdDateCreated,
    createdIsApprovedByFrom,
    createdIsReturnedByTo
  };
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
  const { isReturnedByTo: resultIsReturnByTo } = await post(
    "profile.updateInShare",
    {
      shareID,
      isReturnedByTo
    }
  );

  return { resultIsReturnByTo };
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
        shareRaw.isReturnedByTo,
        null //post to be set later
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
