import RouteNode from "route-node";

const { NODE_ENV } = process.env;
let BACKEND_BASE_URL;
let BACKEND_PORT;

if (NODE_ENV === "production") {
  BACKEND_BASE_URL = "https://goodneighbor-backend-test.herokuapp.com";
  BACKEND_PORT = "";
} else {
  BACKEND_BASE_URL = "http://localhost";
  if (process.env.REACT_APP_NODE_ENV === "test") {
    BACKEND_PORT = ":3001";
  } else {
    BACKEND_PORT = ":3000";
  }
}

const BACKEND_URL = `${BACKEND_BASE_URL}${BACKEND_PORT}`;

const API_NODE = new RouteNode("", "", [
  new RouteNode("profile", "/profile", [
    { name: "authCheck", path: "/authCheck" },
    { name: "logout", path: "/logout" },
    { name: "searchEmail", path: "/searchEmail?:email" },
    // - connection
    { name: "connections", path: "/connections" },
    { name: "createConnection", path: "/createConnection" },
    { name: "updateConnection", path: "/updateConnection" },
    // - post
    { name: "createPost", path: "/createPost" },
    { name: "updatePost", path: "/updatePost" },
    { name: "awareReturnPost", path: "/awareReturnPost" },
    // - outPosts
    { name: "outPosts", path: "/outPosts" },
    // - inPosts
    { name: "inPosts", path: "/inPosts" },
    // - share
    { name: "share", path: "/share" },
    { name: "createShare", path: "/createShare" },
    { name: "deleteShare", path: "/deleteShare" },
    { name: "approveShare", path: "/approveShare" },
    { name: "returnShare", path: "/returnShare" },
    { name: "awareApproveShare", path: "/awareApproveShare" }
  ]),
  new RouteNode("auth", "/auth", [
    { name: "google", path: "/google" },
    {
      name: "login_for_test_dev",
      path: "/login_for_test_dev?:email?:name"
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

export { API_URL };
