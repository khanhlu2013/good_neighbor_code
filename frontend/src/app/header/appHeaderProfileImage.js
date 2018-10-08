import React, { Component } from "react";
import PropTypes from "prop-types";

import { User } from "../../model/user";

const noProfileImageFileName = "no_profile_image.png";

class AppHeaderProfileImage extends Component {
  onImageError = e => {
    e.target.src = noProfileImageFileName;
  };

  render() {
    const { loginUser } = this.props;
    const profileImageUrl = loginUser.profileImageUrl || noProfileImageFileName;

    return (
      <div
        className="app-header-profile-image"
        title={loginUser.getNameAndEmail()}
      >
        <img
          src={profileImageUrl}
          alt={loginUser.getNameAndEmail()}
          width="22"
          height="22"
          onError={this.onImageError}
        />
        <div className="app-header-profile-image-caption">me</div>
      </div>
    );
  }
}

AppHeaderProfileImage.propTypes = {
  loginUser: PropTypes.instanceOf(User).isRequired
};

export { AppHeaderProfileImage };
