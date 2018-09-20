import { API_URL } from "./api-url";
import { User } from "../model/user";
import { rawsToConnections, rawToConnection, rawsToPosts } from "./api-helper";

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
  return rawsToConnections(raws);
};

const createConnection = async userIdToAdd => {
  const raw = await post("profile.createConnection", {
    userIdToAdd
  });
  return rawToConnection(raw);
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
  return rawsToPosts(postsRaw);
};

// - inPost
const inPosts = async () => {
  const postsRaw = await get("profile.inPosts", {}); //inPosts <-> [{user,post,shares}, ...]
  return rawsToPosts(postsRaw);
};

// -  share
const createShare = async postID => {
  const {
    _id: id,
    dateCreated,
    isApprove,
    isAwareApprove,
    isReturn,
    isAwareReturn
  } = await post("profile.createShare", {
    postID
  });
  return {
    id,
    dateCreated,
    isApprove,
    isAwareApprove,
    isReturn,
    isAwareReturn
  };
};

const deleteShare = async shareID => {
  await post("profile.deleteShare", { shareID });
};

const approveShare = async (shareID, isApprove) => {
  const { isApprove: updatedIsApprove } = await post("profile.approveShare", {
    shareID,
    isApprove
  });

  return updatedIsApprove;
};

const returnShare = async (shareID, isReturn) => {
  const { isReturn: resultIsReturnByTo } = await post("profile.returnShare", {
    shareID,
    isReturn
  });

  return { resultIsReturnByTo };
};

const awareApproveShare = async shareId => {
  const { isAwareApprove } = await post("profile.awareApproveShare", {
    shareId
  });

  return isAwareApprove;
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
  deleteShare,
  approveShare,
  returnShare,
  awareApproveShare
};
export { API };
