const loginUser = state => state.auth.loginUser;
const isCheckedAuth = state => state.auth.isCheckedAuth;
const isCheckingAuth = state => state.auth.isCheckingAuth;
const isLoggingOut = state => state.auth.isLoggingOut;

const AuthSelector = {
  loginUser,
  isCheckedAuth,
  isCheckingAuth,
  isLoggingOut
};
export default AuthSelector;
