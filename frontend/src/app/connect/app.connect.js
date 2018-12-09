import { connect } from "react-redux";

import { checkAuth } from "@gn/common/app/action/auth.action";
import AppController from "@gn/common/app/controller/app.controller";

const AppConnect = connect(
  state => ({
    loginUser: state.auth.loginUser,
    isCheckedAuth: state.auth.isCheckedAuth
  }),
  dispatch => ({ authCheck: () => dispatch(checkAuth()) })
)(AppController);

export default AppConnect;
