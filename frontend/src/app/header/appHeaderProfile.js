import React, { Component } from "react";
import PropTypes from "prop-types";

import { User } from "../../model/user";
import { API } from "../../api/profile-api";
import { LoadingIcon } from "../../util/loadingIcon";

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

  onfallbackProfileImage = ev => {
    console.log("xx");
    //ev.target.src = "noProfileImage.svg";
  };

  render() {
    const { loginUser } = this.props;

    return (
      <div>
        <span>
          <img
            src={loginUser.profileImageUrl || "noProfileImage.svg"}
            alt="profile"
            title={loginUser.getNameAndEmail()}
            width="42"
            height="42"
            onError={this.onfallbackProfileImage}
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
