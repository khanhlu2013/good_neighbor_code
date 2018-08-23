import RouteNode from "route-node";

const { NODE_ENV } = process.env;
let BACKEND_PORT;

if (NODE_ENV === "production") {
  throw Error("UNDER CONSTRUCTION");
} else {
  if (process.env.REACT_APP_NODE_ENV === "test") {
    BACKEND_PORT = "3001";
  } else {
    BACKEND_PORT = "3000";
  }
}

const BACKEND_URL = `http://localhost:${BACKEND_PORT}`;

const API_NODE = new RouteNode("", "", [
  new RouteNode("profile", "/profile", [
    { name: "logout", path: "/logout" },
    { name: "searchEmail", path: "/searchEmail?:email" },
    { name: "createConnection", path: "/createConnection" },
    { name: "modifyConnection", path: "/modifyConnection" },
    { name: "connections", path: "/connections" },
    { name: "posts", path: "/posts" },
    { name: "crudPost", path: "/crudpost" }
  ]),
  new RouteNode("auth", "/auth", [
    { name: "google", path: "/google" },
    {
      name: "dummy_login_for_test_purpose",
      path: "/dummy_login_for_test_purpose?:email?:name"
    }
  ])
]);

const API_URL = (dottedPath, params) => {
  const path = API_NODE.buildPath(dottedPath, params);
  if (!path) {
    throw Error(`${dottedPath} is not found!`);
  }

  return BACKEND_URL + path;
};

export default {
  API_URL,
  BACKEND_URL
};
