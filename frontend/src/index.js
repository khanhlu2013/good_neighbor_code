import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import "./registerIcon";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/index.css";
import "./css/myBootstrap.css";
import "./css/reactModal.css";
import authReducer from "./app/reducer/auth.reducer";
import connectionReducer from "./bus/connection/reducer/connection_reducer";
import inPostReducer from "./bus/inPost/reducer/inPost.reducer";
import outPostReducer from "./bus/outPost/reducer/outPost_reducer";
import selectAppTabReducer from "./app/reducer/selectAppTab.reducer";
import AppView from "./app/view/app.view";
import AppConnect from "./app/connect/app.connect";
import commonFunction from "common";

commonFunction();

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
    <AppConnect view={AppView} />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
