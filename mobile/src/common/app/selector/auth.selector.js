const loginUser = state => state.auth.loginUser;
const isCheckedAuth = state => state.auth.isCheckedAuth;
const isCheckingAuth = state => state.auth.isCheckingAuth;

const AuthSelector = {
  loginUser,
  isCheckedAuth,
  isCheckingAuth
};
export default AuthSelector;
