import { combineReducers } from "redux";
import authReducer from "../app/reducer/auth.reducer";
import connectionReducer from "./connection_reducer";
import inPostReducer from "../bus/inPost/reducer/inPost.reducer";
import selectAppTabReducer from "../app/reducer/selectAppTab.reducer";
import outPostReducer from "../bus/outPost/reducer/outPost_reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  connection: connectionReducer,
  inPost: inPostReducer,
  outPost: outPostReducer,
  selectAppTab: selectAppTabReducer
});

export default rootReducer;
