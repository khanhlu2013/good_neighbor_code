import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

import { User } from "../../model/user";

class AppHeaderProfileImage extends Component {
  state = {
    isImageError: false
  };

  onImageError = e => {
    this.setState({ isImageError: true });
  };

  getAltImage() {
    return <FontAwesomeIcon icon="user" size="lg" />;
  }

  render() {
    const { loginUser } = this.props;
    const { profileImageUrl } = loginUser;
    let content;

    if (profileImageUrl) {
      content = this.state.isImageError ? (
        this.getAltImage()
      ) : (
        <img
          src={profileImageUrl}
          alt={loginUser.getNameAndEmail()}
          width="42"
          height="42"
          onError={this.onImageError}
        />
      );
    } else {
      content = this.getAltImage();
    }

    return (
      <div
        className="app-header-profile-image"
        title={loginUser.getNameAndEmail()}
      >
        {content}
        <div className="app-header-profile-image-caption">me</div>
      </div>
    );
  }
}

AppHeaderProfileImage.propTypes = {
  loginUser: PropTypes.instanceOf(User).isRequired
};

export { AppHeaderProfileImage };
