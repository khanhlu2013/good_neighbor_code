import API_URL from "./api-url";
import {
  rawsToConnections,
  rawToConnection,
  rawsToPosts,
  rawToUser
} from "./_private_api_helper";

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
  /*
    PRECONDITION: email is valid. Since this is just a feature for testing purpose, i dont need 
    to be so elaborate with this API. Thus, i will pass the responsibility of checking email
    valid to the caller. If email is valid, and server response with an error, i will assume
    the error to be caused from email not found (but it could be network error or invalid email)
    The assumtion above also comming from making this API very minimal since it is only lasting
    during development and testing

    RETURN: the user with the provided email or null if email is not found. Again a known issue
    of this implementation is that if the network error, it also return null. but i will live 
    with it to make this API minimal for testing only
  */
  try {
    const raw = await post("auth.backdoorLogin", { email, name });
    return rawToUser(raw);
  } catch (e) {
    return null;
  }
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

const deleteShare = async shareId => {
  await post("profile.deleteShare", { shareId });
};

const approveShare = async (shareId, isApprove) => {
  const { isApprove: resultIsApprove } = await post("profile.approveShare", {
    shareId,
    isApprove
  });

  return resultIsApprove;
};

const returnShare = async shareId => {
  const { isReturn: resultIsReturnByTo, dateReturn } = await post(
    "profile.returnShare",
    {
      shareId
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
export default API;
