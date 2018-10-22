import React, { Component } from "react";
import PropTypes from "prop-types";

import { User } from "../model/user";
import { API } from "../api/profile-api";
import { LoadingIcon } from "../componentUi/loadingIcon";
import { ProfileImage } from "../componentUi/profileImage";
import { AppCenterWrapStyle } from "../componentUi/style/appCenterWrap_style";
import { ShadowBoxStyle } from "../componentUi/style/shadowBox_style";

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
      <AppCenterWrapStyle>
        <ShadowBoxStyle className="text-center mt-4 p-2">
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
        </ShadowBoxStyle>
      </AppCenterWrapStyle>
    );
  }
}

ProfileManagement.propTypes = {
  loginUser: PropTypes.instanceOf(User).isRequired,
  onUserDidLogOut: PropTypes.func.isRequired
};

export { ProfileManagement };
