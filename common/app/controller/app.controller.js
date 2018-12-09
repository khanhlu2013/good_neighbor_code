import { Component } from "react";
import PropTypes from "prop-types";
import { nullOrRequiredValidator } from "../../util";
import User from "../../model/user";

class AppController extends Component {
  componentDidMount() {
    this.props.authCheck();
  }

  render() {
    const { loginUser, isCheckingAuth, isCheckedAuth, view } = this.props;
    return view(loginUser, isCheckingAuth, isCheckedAuth);
  }
}

AppController.propTypes = {
  loginUser: nullOrRequiredValidator("object", User),
  isCheckedAuth: PropTypes.bool.isRequired,
  isCheckingAuth: PropTypes.bool.isRequired,
  authCheck: PropTypes.func.isRequired,
  view: PropTypes.func.isRequired
};
export default AppController;
