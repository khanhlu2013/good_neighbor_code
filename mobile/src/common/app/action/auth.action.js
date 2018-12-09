import API from "../../api";

//AUTH CHECK
export const INFORM_CHECKING_AUTH = "INFORM_CHECKING_AUTH";
export const RECEIVE_AUTH_CHECK_RESULT = "RECEIVE_AUTH_CHECK_RESULT";

export const checkAuth = () => (dispatch, getState) => {
  dispatch({
    type: INFORM_CHECKING_AUTH
  });
  return API.authCheck().then(authenticatedUser => {
    dispatch({
      type: RECEIVE_AUTH_CHECK_RESULT,
      authenticatedUser
    });
    return authenticatedUser;
  });
};

//LOG OUT
export const INFORM_LOGGING_OUT = "INFORM_LOGGING_OUT";
export const RECEIVE_LOGGED_OUT_SUCCESS = "RECEIVE_LOGGED_OUT_SUCCESS";

export const logOut = () => (dispatch, getState) => {
  dispatch({
    type: INFORM_LOGGING_OUT
  });
  API.logout().then(() => {
    dispatch({
      type: RECEIVE_LOGGED_OUT_SUCCESS
    });
  });
};
