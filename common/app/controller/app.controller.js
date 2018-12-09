import { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { nullOrRequiredValidator } from "../../util";
import User from "../../model/user";
import AuthSelector from "../selector/auth.selector";
import { checkAuth } from "../action/auth.action";

class AppControllerDisconnect extends Component {
  componentDidMount() {
    this.props.authCheck();
  }

  render() {
    const { loginUser, isCheckingAuth, isCheckedAuth, view } = this.props;
    return view(loginUser, isCheckingAuth, isCheckedAuth);
  }
}

AppControllerDisconnect.propTypes = {
  loginUser: nullOrRequiredValidator("object", User),
  isCheckedAuth: PropTypes.bool.isRequired,
  isCheckingAuth: PropTypes.bool.isRequired,
  authCheck: PropTypes.func.isRequired,
  view: PropTypes.func.isRequired
};

const AppControllerConnect = connect(
  state => ({
    loginUser: AuthSelector.loginUser(state),
    isCheckingAuth: AuthSelector.isCheckingAuth(state),
    isCheckedAuth: AuthSelector.isCheckedAuth(state)
  }),
  dispatch => ({ authCheck: () => dispatch(checkAuth()) })
)(AppControllerDisconnect);

export default AppControllerConnect;
