const loginUser = state => state.auth.loginUser;
const isCheckedAuth = state => state.auth.isCheckedAuth;

const AuthSelector = {
  loginUser,
  isCheckedAuth
};
export default AuthSelector;
