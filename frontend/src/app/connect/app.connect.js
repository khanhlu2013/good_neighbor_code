import { connect } from "react-redux";

import { checkAuth } from "../action/auth.action";
import AppController from "../controller/app.controller";

const AppConnect = connect(
  state => ({
    loginUser: state.auth.loginUser,
    isCheckedAuth: state.auth.isCheckedAuth
  }),
  dispatch => ({ authCheck: () => dispatch(checkAuth()) })
)(AppController);

export default AppConnect;
