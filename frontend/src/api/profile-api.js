import keys from "../configs/keys.js";

const profile = async () => {
  const request = await fetch(keys.API_URL("profile"), {
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

const connections = () => {
  return get("profile.connections", {});
};

const modifyConnection = (connectionId, isApproved) => {
  return post("profile.modifyConnection", {
    connectionId,
    isApproved
  });
};

const createConnection = userIdToAdd => {
  return post("profile.createConnection", {
    userIdToAdd
  });
};

const posts = async () => {
  return get("profile.posts", {});
};

const updatePost = async (postID, title, description) => {
  const crudedPost = await post("profile.updatePost", {
    postID,
    title,
    description
  });
  return crudedPost;
};

const createPost = async (title, description) => {
  const crudedPost = await post("profile.createPost", {
    title,
    description
  });
  return crudedPost;
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
  const response = await fetch(keys.API_URL(dottedPath), {
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
  const url = keys.API_URL(dottedPath, params);
  const response = await fetch(url, { credentials: "include" });
  return await getJSON(response);
}

//-------------

const API = {
  profile,
  searchEmail,
  connections,
  modifyConnection,
  createConnection,
  posts,
  createPost,
  updatePost
};
export { API };
