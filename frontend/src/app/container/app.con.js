import { connect } from "react-redux";

import AppComponent from "../component/app.com";
import { checkAuth } from "../../action/auth_action";

const AppContainer = connect(
  state => ({ loginUser: state.auth.loginUser }),
  dispatch => ({ authCheck: () => dispatch(checkAuth()) })
)(AppComponent);
export default AppContainer;
