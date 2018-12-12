import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { checkAuth } from "../../common/app/action/auth.action";

class _ extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    view: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.dispatch(checkAuth());
  }

  render() {
    return React.createElement(this.props.view, {});
  }
}

const AuthCheckController = connect()(_);
export default AuthCheckController;
