import React, { Component } from "react";
import PropTypes from "prop-types";

import { User } from "../model/user";
import { API } from "../api/profile-api";
import { AppShrinkWrap } from "../componentUi/appShrinkWrap";
import { LoadingIcon } from "../componentUi/loadingIcon";
import { ProfileImage } from "../componentUi/profileImage";

class ProfileManagement extends Component {
  state = {
    logingOut: false
  };

  onLogoutClicked = e => {
    this.setState({ logingOut: true });
    (async () => {
      await API.logout();
      this.setState({ logingOut: false });
      this.props.onUserDidLogOut();
    })();
  };

  render() {
    const { loginUser } = this.props;
    return (
      <AppShrinkWrap>
        <div className="text-center mt-4 p-2 shadow-box">
          <div>
            <ProfileImage loginUser={loginUser} />
            <span className="ml-2">{loginUser.getNameAndEmail()}</span>
          </div>

          <div className="mt-3">
            {this.state.logingOut ? (
              <LoadingIcon text="logout" />
            ) : (
              <button
                id="appLogOutBtn-react"
                onClick={this.onLogoutClicked}
                className="btn btn-warning"
              >
                logout
              </button>
            )}
          </div>
        </div>
      </AppShrinkWrap>
    );
  }
}

ProfileManagement.propTypes = {
  loginUser: PropTypes.instanceOf(User).isRequired,
  onUserDidLogOut: PropTypes.func.isRequired
};

export { ProfileManagement };
