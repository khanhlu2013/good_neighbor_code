import React, { Component } from "react";
import PropTypes from "prop-types";

import { User } from "../../model/user";
import { LoadingIcon } from "../../util";
import { API } from "../../api/profile-api";

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
      <div>
        <span>
          <img
            src={loginUser.profileImageUrl}
            alt="profile"
            width="42"
            height="42"
            title={loginUser.getNameAndEmail()}
          />
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
}

AppHeaderProfile.propTypes = {
  loginUser: PropTypes.instanceOf(User).isRequired,
  onLogOut: PropTypes.func.isRequired
};

export { AppHeaderProfile };
