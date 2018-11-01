import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faThumbsUp, //approve
  faThumbsDown, //deny
  faTrashAlt, //remove
  faUndoAlt,
  faPlay, //play youtube video
  faPause, //pause youtube video
  faClock, //youtube video duration
  faBriefcase, //my post
  faUserCog, //profile image replacer
  faGlobe, //in posts
  faUserFriends, //friends or my networks
  faHandHoldingHeart, //borrow (work both for in and out post)
  faHistory,
  faCheck, //approve : when request is being approve, could also use for isActivePost.
  faQuestion, //request: making a request from inPost
  faRetweet,
  faSignOutAlt, //connection - my request
  faSignInAlt, //connection - friend request
  faSearch,
  faUserSlash //deny user list
} from "@fortawesome/free-solid-svg-icons";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/index.css";
import "./css/myBootstrap.css";
import "./css/reactModal.css";
import rootReducer from "./reducer";
import AppContainer from "./app/container/app.con";

library.add(
  faThumbsUp,
  faThumbsDown,
  faTrashAlt,
  faUndoAlt,
  faPlay,
  faPause,
  faClock,
  faBriefcase,
  faUserCog,
  faGlobe,
  faUserFriends,
  faHandHoldingHeart,
  faHistory,
  faCheck,
  faQuestion,
  faRetweet,
  faSignOutAlt,
  faSignInAlt,
  faSearch,
  faUserSlash
);

const middleware = [thunk];
if (process.env.NODE_ENV !== "production") {
  middleware.push(createLogger());
}
const store = createStore(rootReducer, applyMiddleware(...middleware));

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
