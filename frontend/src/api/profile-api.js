import { API_URL } from "./api-url";
import {
  rawsToConnections,
  rawToConnection,
  rawsToPosts,
  rawToUser
} from "./api-helper";

// - auth
const authCheck = async () => {
  const response = await fetch(API_URL("profile.authCheck"), {
    credentials: "include"
  });
  if (response.status === 401) {
    return null;
  }
  const raw = await response.json();
  return rawToUser(raw);
};

const backDoorLogin = async (email, name) => {
  const raw = await post("auth.backdoorLogin", { email, name });
  return rawToUser(raw);
};

const logout = async () => {
  await post("profile.logout");
};

// - connection
const searchEmail = async searchedEmail => {
  const raw = await get("profile.searchEmail", {
    email: searchedEmail
  });
  if (!raw) return null;

  return rawToUser(raw);
};

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
    isApproveByTo: updatedApprovedByTo,
    isApproveByFrom: updatedApprovedByFrom
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
    dateCreate: createdDateCreated
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
  const { _id: id, dateCreate } = await post("profile.createShare", {
    postID
  });
  return {
    id,
    dateCreate
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
  const { isReturn: resultIsReturnByTo, dateReturn } = await post(
    "profile.returnShare",
    {
      shareID,
      isReturn
    }
  );

  return { resultIsReturnByTo, resultDateReturn: new Date(dateReturn) };
};

const awareApproveShare = async shareId => {
  const { isAwareApprove } = await post("profile.awareApproveShare", {
    shareId
  });

  return isAwareApprove;
};

const awareReturnPost = async postId => {
  await post("profile.awareReturnPost", {
    postId
  });
};

//- helper ----

async function get(dottedPath, params) {
  const url = API_URL(dottedPath, params);
  const response = await fetch(url, { credentials: "include" });
  if (response.status === 500) {
    throw new Error("internal server error");
  }
  return await _getJSON(response);
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
  if (response.status === 500) {
    throw new Error("internal server error");
  }
  return await _getJSON(response);
}

async function _getJSON(response) {
  const text = await response.text();
  if (!text) {
    return null;
  }
  return JSON.parse(text);
}

//-------------

const API = {
  //auth
  authCheck,
  logout,
  backDoorLogin,
  //connection
  searchEmail,
  connections,
  createConnection,
  updateConnection,
  //post
  createPost,
  updatePost,
  awareReturnPost,
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
