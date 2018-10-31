import { combineReducers } from "redux";
import authReducer from "./auth_reducer";
import connectionReducer from "./connection_reducer";
import inPostReducer from "./inPost_reducer";
import outPostReducer from "./outPost_reducer";
import selectAppTabReducer from "./selectAppTab_reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  connection: connectionReducer,
  inPost: inPostReducer,
  outPost: outPostReducer,
  selectAppTab: selectAppTabReducer
});

export default rootReducer;
