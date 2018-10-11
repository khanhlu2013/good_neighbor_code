import React, { Component } from "react";
import PropTypes from "prop-types";

import { User } from "../../model/user";
import { ProfileImage } from "../../util/profileImage";
import "./appHeaderProfileImageMe.css";

class AppHeaderProfileImageMe extends Component {
  render() {
    const { loginUser } = this.props;

    return (
      <div
        className="app-header-profile-image-me"
        title={loginUser.getNameAndEmail()}
      >
        <ProfileImage loginUser={loginUser} />
        <div className="app-header-profile-image-me-caption">me</div>
      </div>
    );
  }
}

AppHeaderProfileImageMe.propTypes = {
  loginUser: PropTypes.instanceOf(User).isRequired
};

export { AppHeaderProfileImageMe };
