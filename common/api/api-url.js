import RouteNode from "route-node";

const NODE_ENV = get_NODE_ENV();
let BACKEND_BASE_URL;
let BACKEND_PORT;

if (NODE_ENV === "production") {
  BACKEND_BASE_URL = "https://goodneighbor-backend-test.herokuapp.com";
  BACKEND_PORT = "";
} else {
  BACKEND_BASE_URL = "http://localhost";
  //BACKEND_BASE_URL = "http://10.0.2.2"; //this is for android emulator.since adroid emulator has it own localhost or 127.0.0.1 ; 10.0.2.2 is a alias for local host for android emulator for development purpose.
  BACKEND_PORT = "3001";
}

const BACKEND_URL = `${BACKEND_BASE_URL}:${BACKEND_PORT}`;

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

  return BACKEND_URL + path;
};

export default API_URL;

// - private ---
function get_NODE_ENV() {
  /*
    NOTE that this code is in common project. 
    
    When is is build together with the web app by CreateReactApp, process.env.NODE_ENV will be set based on npm run or npm test or npm build which set it to "development" or "test" or "production"

    When it is build by expo mobile/reactNative app, it will have to be set by expo. i am not sure what is this going to be but i know for sure that for local development, this var is not "production" . Since i haven't build production code for mobile, lets just move on here. 

  */
  return process.env.NODE_ENV;
}
