import keys from "../configs/keys.js";

const modifyConnection = (connectionId, isApproved) => {
  return fetch(keys.API_URL("profile.modifyConnection"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ connectionId, isApproved }),
    credentials: "include"
  });
};

const createConnection = userIdToAdd => {
  return fetch(keys.API_URL("profile.createConnection"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ userIdToAdd }),
    credentials: "include"
  });
};

export default {
  modifyConnection,
  createConnection
};
