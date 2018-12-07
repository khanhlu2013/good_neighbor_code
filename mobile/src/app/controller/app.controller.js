import { Component } from "react";
import PropTypes from "prop-types";

import User from "../../model/user";
import { nullOrRequiredValidator } from "../../share/util";

class AppController extends Component {
  static propTypes = {
    loginUser: nullOrRequiredValidator("object", User),
    isCheckedAuth: PropTypes.bool.isRequired,
    authCheck: PropTypes.func.isRequired,
    view: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.authCheck();
  }

  render() {
    const { loginUser, view, isCheckedAuth } = this.props;
    return view(loginUser, isCheckedAuth);
  }
}

export default AppController;
