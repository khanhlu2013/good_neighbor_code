import RouteNode from "route-node";

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
      name: "backdoorLogin",
      path: "/backdoorLogin?:email?:name"
    }
  ])
]);

const API_URL = (dottedPath, params) => {
  const path = API_NODE.buildPath(dottedPath, params);
  if (!path) {
    throw Error(`${dottedPath} is not found!`);
  }

  return _get_backend_url() + path;
};

export default API_URL;

// - private ---
function _get_backend_url() {
  if (_get_prod_dev_test() === "production") {
    return BACKEND_URL.production;
  } else {
    return BACKEND_URL.local;
  }
}

function _get_prod_dev_test() {
  /*
    NOTE that this code is in common project. 
    When is is build together with the web app by CreateReactApp, process.env.prod_dev_test will be set based on npm run or npm test or npm build which set it to "development" or "test" or "production"
    When it is build by expo mobile/reactNative app, it will have to be set by expo. i am not sure what is this going to be but i know for sure that for local development, this var is not "production" . Since i haven't build production code for mobile, lets just move on here. 

  */
  return process.env.prod_dev_test;
}
