import {
  //- auth check
  INFORM_CHECKING_AUTH,
  RECEIVE_AUTH_CHECK_RESULT,

  //- logout
  INFORM_LOGGING_OUT,
  RECEIVE_LOGGED_OUT_SUCCESS
} from "../action/auth.action";

const defaultAuthState = {
  loginUser: null,
  isCheckedAuth: false,
  isCheckingAuth: false,
  isLoggingOut: false
};
const authReducer = (state = defaultAuthState, action) => {
  switch (action.type) {
    case INFORM_CHECKING_AUTH:
      return { ...state, isCheckingAuth: true };

    case RECEIVE_AUTH_CHECK_RESULT:
      return {
        ...state,
        loginUser: action.authenticatedUser,
        isCheckingAuth: false,
        isCheckedAuth: true
      };

    case INFORM_LOGGING_OUT:
      return { ...state, isLoggingOut: true };

    case RECEIVE_LOGGED_OUT_SUCCESS:
      return { ...state, loginUser: null, isLoggingOut: false };

    default:
      return state;
  }
};

export default authReducer;

/*

  authReducer = {
    isCheckingAuth : boolean,
    isLoggingOut: boolean,
    loginUser : instanceof User; value = (undefined | null | User)
  }

*/
