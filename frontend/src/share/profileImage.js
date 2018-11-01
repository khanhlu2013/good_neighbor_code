import React, { Component } from "react";
import PropTypes from "prop-types";

import User from "../model/user";

const noProfileImageFileName = "no_profile_image.png";

class ProfileImage extends Component {
  onImageError = e => {
    e.target.src = noProfileImageFileName;
  };

  render() {
    const { loginUser } = this.props;
    const profileImageUrl = loginUser.profileImageUrl || noProfileImageFileName;

    return (
      <img
        src={profileImageUrl}
        alt={loginUser.getNameAndEmail()}
        width="33"
        height="33"
        onError={this.onImageError}
        title={loginUser.getNameAndEmail()}
      />
    );
  }
}

ProfileImage.propTypes = {
  loginUser: PropTypes.instanceOf(User).isRequired
};

export default ProfileImage;
