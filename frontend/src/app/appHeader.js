import React, { Component } from "react";
import PropTypes from "prop-types";
import { User } from "../model/user";
import { GoogleLogin } from "./googleLogin";
import { LoadingIcon } from "../util";
import { API } from "../api/profile-api";
import "./appHeader.css";

class AppHeader extends Component {
  state = {
    logingOut: false
  };

  onLogoutClicked = e => {
    this.setState({ logingOut: true });
    (async () => {
      await API.logout();
      this.setState({ logingOut: false });
      this.props.onLoginUserChange(null);
    })();
  };

  render() {
    const { loginUser } = this.props;
    let content;

    if (loginUser === undefined) {
      content = (
        <h4>
          <LoadingIcon text="loading" />
        </h4>
      );
    } else if (loginUser === null) {
      content = <GoogleLogin />;
    } else {
      content = (
        <div>
          <span className="app-header-login-user-name">
            {loginUser.getNameAndEmail()}
          </span>
          <span className="ml-2">
            {this.state.logingOut ? (
              <LoadingIcon text="logout" />
            ) : (
              <button
                onClick={this.onLogoutClicked}
                className="btn btn-sm btn-warning"
              >
                logout
              </button>
            )}
          </span>
        </div>
      );
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
  onLoginUserChange: PropTypes.func.isRequired
};

export { AppHeader };
