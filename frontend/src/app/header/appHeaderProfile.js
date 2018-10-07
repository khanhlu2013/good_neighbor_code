import React, { Component } from "react";
import PropTypes from "prop-types";

import { User } from "../../model/user";
import { API } from "../../api/profile-api";
import { LoadingIcon } from "../../util/loadingIcon";
import { AppHeaderProfileImage } from "./appHeaderProfileImage";
import "./appHeaderProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class AppHeaderProfile extends Component {
  state = {
    logingOut: false
  };

  onLogoutClicked = e => {
    this.setState({ logingOut: true });
    (async () => {
      await API.logout();
      this.setState({ logingOut: false });
      this.props.onLogOut();
    })();
  };

  render() {
    const { loginUser } = this.props;

    return (
      <div className="app-header-profile">
        <AppHeaderProfileImage loginUser={loginUser} />

        <div className="ml-2">
          {this.state.logingOut ? (
            <LoadingIcon text="logout" />
          ) : (
            <button
              onClick={this.onLogoutClicked}
              className="btn btn-sm btn-warning"
            >
              <FontAwesomeIcon icon="power-off" size="lg" />
            </button>
          )}
        </div>
      </div>
    );
  }
}

AppHeaderProfile.propTypes = {
  loginUser: PropTypes.instanceOf(User).isRequired,
  onLogOut: PropTypes.func.isRequired
};

export { AppHeaderProfile };
