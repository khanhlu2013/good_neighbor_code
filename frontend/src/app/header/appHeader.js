import React, { Component } from "react";
import PropTypes from "prop-types";

import { User } from "../../model/user";
import { GoogleLogin } from "../googleLogin";
import { AppHeaderProfile } from "./appHeaderProfile";
import { LoadingIcon } from "../../util";
import "./appHeader.css";

class AppHeader extends Component {
  render() {
    const { loginUser, onLogOut } = this.props;
    let content;

    if (loginUser === undefined) {
      content = <LoadingIcon text="loading" />;
    } else if (loginUser === null) {
      content = <GoogleLogin />;
    } else {
      content = <AppHeaderProfile loginUser={loginUser} onLogOut={onLogOut} />;
    }
    return (
      <div className="bg-primary">
        <div className="app-header app-container">
          <div className="app-header-text-icon">Good Neighbor</div>
          {content}
        </div>
      </div>
    );
  }
}
AppHeader.propTypes = {
  loginUser: PropTypes.instanceOf(User),
  onLogOut: PropTypes.func.isRequired
};

export { AppHeader };
