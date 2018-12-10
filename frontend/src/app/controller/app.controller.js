import { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import AuthSelector from "@gn/common/app/selector/auth.selector";
import { checkAuth } from "@gn/common/app/action/auth.action";
import { nullOrRequiredValidator } from "@gn/common/util";
import User from "@gn/common/model/user";

class _ extends Component {
  componentDidMount() {
    this.props.authCheck();
  }

  render() {
    const { loginUser, isCheckingAuth, isCheckedAuth, view } = this.props;
    return view(loginUser, isCheckingAuth, isCheckedAuth);
  }
}

_.propTypes = {
  loginUser: nullOrRequiredValidator("object", User),
  isCheckedAuth: PropTypes.bool.isRequired,
  isCheckingAuth: PropTypes.bool.isRequired,
  authCheck: PropTypes.func.isRequired,
  view: PropTypes.func.isRequired
};

const AppController = connect(
  state => ({
    loginUser: AuthSelector.loginUser(state),
    isCheckingAuth: AuthSelector.isCheckingAuth(state),
    isCheckedAuth: AuthSelector.isCheckedAuth(state)
  }),
  dispatch => ({ authCheck: () => dispatch(checkAuth()) })
)(_);

export default AppController;
