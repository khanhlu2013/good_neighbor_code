import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { User } from "../model/user";
import { Login } from "./login";
import { LoadingIcon } from "../util";
import BackdoorLogin from "./backdoorLogin";
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
      content = (
        <Fragment>
          <Login />
          <BackdoorLogin onLoginUserChange={this.props.onLoginUserChange} />
        </Fragment>
      );
    } else {
      content = (
        <div>
          {loginUser.name}
          <span className="mx-1">
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
      <div className="app-header-container">
        <div className="app-header">
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
