import { API } from "../api/profile-api";

export const INFORM_CHECKING_AUTH = "INFORM_CHECKING_AUTH";
export const INFORM_CHECKED_AUTH = "INFORM_CHECKED_AUTH";
export const INFORM_LOGGING_OUT = "INFORM_LOGGING_OUT";
export const INFORM_LOGGED_OUT = "INFORM_LOGGED_OUT";

export const STORE_LOGIN_USER = "STORE_LOGIN_USER";

export const informCheckingAuth = () => ({
  type: INFORM_CHECKING_AUTH
});
export const informCheckedAuth = () => ({
  type: INFORM_CHECKED_AUTH
});
export const informLoggingOut = () => ({
  type: INFORM_LOGGING_OUT
});
export const informLoggedOut = () => ({
  type: INFORM_LOGGED_OUT
});

export const storeLoginUser = loginUser => ({
  type: STORE_LOGIN_USER,
  loginUser
});

export const checkAuth = () => (dispatch, getState) => {
  dispatch(informCheckingAuth());
  API.authCheck().then(loginUser => {
    dispatch(informCheckedAuth());
    dispatch(storeLoginUser(loginUser));
  });
};

export const logOut = () => (dispatch, getState) => {
  dispatch(informLoggingOut());
  API.logout().then(() => {
    dispatch(informLoggedOut());
    dispatch(storeLoginUser(null));
  });
};
