import { connect } from "react-redux";
import AuthSelector from "../selector/auth.selector";
import AppController from "../controller/app.controller";
import { checkAuth } from "../action/auth.action";

const AppConnect = connect(
  state => ({
    loginUser: AuthSelector.loginUser(state),
    isCheckedAuth: AuthSelector.isCheckedAuth(state)
  }),
  dispatch => ({ authCheck: () => dispatch(checkAuth()) })
)(AppController);

export default AppConnect;
