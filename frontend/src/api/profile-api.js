import { API_URL } from "./api-url";

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
const outPosts = async isActive => {
  // if (!isActive) -> we will retrieve both
  return get("profile.outPosts", { isActive });
};

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

// -  share
// const shares = async (isIn, isOut) => {
//   if (!isIn && !isOut) {
//     throw Error("Must specify at least in or out share to get");
//   }
//   const shares = await get("profile.share", {
//     isIn,
//     isOut
//   });
//   return shares;
// };

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
  connections,
  createConnection,
  updateConnection,
  // - post
  outPosts,
  createPost,
  updatePost,
  // - share
  //shares,
  createShare,
  updateInShare,
  updateOutShare
};
export { API };
