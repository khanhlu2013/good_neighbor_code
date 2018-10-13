import React, { Component } from "react";
import PropTypes from "prop-types";

import { LoadingIcon } from "../../util/loadingIcon";
import { User } from "../../model/user";
import { API } from "../../api/profile-api";

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
      <div>
        <p>{loginUser.getNameAndEmail()}</p>
        {this.state.logingOut ? (
          <LoadingIcon text="logout" />
        ) : (
          <button
            id="appLogOutBtn-react"
            onClick={this.onLogoutClicked}
            className="btn btn-sm btn-warning app-header-logout-btn"
          >
            logout
          </button>
        )}
      </div>
    );
  }
}

ProfileManagement.propTypes = {
  loginUser: PropTypes.instanceOf(User).isRequired,
  onUserDidLogOut: PropTypes.func.isRequired
};

export { ProfileManagement };
