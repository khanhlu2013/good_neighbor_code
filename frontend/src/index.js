import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import "./configIcon";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/index.css";
import "./css/myBootstrap.css";
import "./css/reactModal.css";
import connectionReducer from "./bus/connection/reducer/connection_reducer";
import outPostReducer from "./bus/outPost/reducer/outPost_reducer";
import selectAppTabReducer from "./app/reducer/selectAppTab.reducer";
import AppWebView from "./app/view/app.webView";
import AppController from "./app/controller/app.controller";
import inPostReducer from "@gn/common/bus/inPost/reducer/inPost.reducer";
import authReducer from "@gn/common/app/reducer/auth.reducer";

const middleware = [thunk];
if (process.env.NODE_ENV !== "production") {
  middleware.push(createLogger());
}
const rootReducer = combineReducers({
  auth: authReducer,
  connection: connectionReducer,
  inPost: inPostReducer,
  outPost: outPostReducer,
  selectAppTab: selectAppTabReducer
});

const store = createStore(rootReducer, applyMiddleware(...middleware));

ReactDOM.render(
  <Provider store={store}>
    <AppController view={AppWebView} />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
