import { combineReducers } from "redux";

import {
  INFORM_CHECKING_AUTH,
  INFORM_CHECKED_AUTH,
  INFORM_LOGGING_OUT,
  INFORM_LOGGED_OUT,
  STORE_LOGIN_USER
} from "../action/auth_action";

const isCheckingAuth = (state = false, action) => {
  switch (action.type) {
    case INFORM_CHECKING_AUTH:
      return true;
    case INFORM_CHECKED_AUTH:
      return false;
    default:
      return state;
  }
};

const isLoggingOut = (state = false, action) => {
  switch (action.type) {
    case INFORM_LOGGING_OUT:
      return true;
    case INFORM_LOGGED_OUT:
      return false;
    default:
      return state;
  }
};

const loginUser = (state = { value: undefined }, action) => {
  switch (action.type) {
    case STORE_LOGIN_USER:
      return { value: action.loginUser };
    default:
      return state;
  }
};

const authReducer = combineReducers({
  isCheckingAuth,
  isLoggingOut,
  loginUser
});
export default authReducer;

/*

  authReducer = {
    isCheckingAuth : boolean,
    isLoggingOut: boolean,
    loginUser.value : instanceof User; value = (undefined | null | User)
  }

*/
