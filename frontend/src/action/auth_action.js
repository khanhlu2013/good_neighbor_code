import API from "../api/profile-api";

//AUTH CHECK
export const INFORM_CHECKING_AUTH = "INFORM_CHECKING_AUTH";
export const RECEIVE_AUTH_CHECK_RESULT = "RECEIVE_AUTH_CHECK_RESULT";

export const checkAuth = () => (dispatch, getState) => {
  dispatch(_informCheckingAuth());
  return API.authCheck().then(authenticatedUser => {
    dispatch(_receiveAuthCheckResult(authenticatedUser));
  });
};
const _informCheckingAuth = () => ({
  type: INFORM_CHECKING_AUTH
});
const _receiveAuthCheckResult = authenticatedUser => ({
  type: RECEIVE_AUTH_CHECK_RESULT,
  authenticatedUser
});

//LOG OUT
export const INFORM_LOGGING_OUT = "INFORM_LOGGING_OUT";
export const RECEIVE_LOGGED_OUT_SUCCESS = "RECEIVE_LOGGED_OUT_SUCCESS";

export const logOut = () => (dispatch, getState) => {
  dispatch(_informLoggingOut());
  API.logout().then(() => {
    dispatch(_receiveLoggedOutSuccess());
  });
};
const _informLoggingOut = () => ({
  type: INFORM_LOGGING_OUT
});
const _receiveLoggedOutSuccess = () => ({
  type: RECEIVE_LOGGED_OUT_SUCCESS
});

//BACKDOOR LOGIN
export const STORE_BACKDOOR_LOGIN_USER = "STORE_BACKDOOR_LOGIN_USER";
export const storeBackdoorLoginUser = backdoorLoginUser => ({
  type: STORE_BACKDOOR_LOGIN_USER,
  backdoorLoginUser
});
