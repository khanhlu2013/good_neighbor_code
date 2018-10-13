import React, { Component } from "react";
import PropTypes from "prop-types";

import { API } from "../../api/profile-api";
import { User } from "../../model/user";
import { GoogleLogin } from "../googleLogin";
import { nullOrRequiredValidator } from "../../util";
import { AppHeaderTabBar } from "./appHeaderTabBar";
import { LoadingIcon } from "../../util/loadingIcon";
import { AppTabEnum } from "../appTabEnum";
import { AppHeaderProfileImageMe } from "./appHeaderProfileImageMe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./appHeader.css";

class AppHeader extends Component {
  state = {
    logingOut: false
  };

  onLogoutClicked = e => {
    this.setState({ logingOut: true });
    (async () => {
      await API.logout();
      this.setState({ logingOut: false });
      this.props.onUserLogOut();
    })();
  };

  render() {
    const {
      loginUser,
      onInPostNav,
      onOutPostNav,
      onConnectionNav,
      selectTab,
      inPostNoteCount,
      outPostNoteCount,
      connectionNoteCount
    } = this.props;

    let content;
    if (loginUser === undefined) {
      content = <LoadingIcon text="loading" />;
    } else if (loginUser === null) {
      content = <GoogleLogin />;
    } else {
      content = (
        <div className="app-header-right-side">
          <AppHeaderTabBar
            onInPostNav={onInPostNav}
            onOutPostNav={onOutPostNav}
            onConnectionNav={onConnectionNav}
            selectTab={selectTab}
            inPostNoteCount={inPostNoteCount}
            outPostNoteCount={outPostNoteCount}
            connectionNoteCount={connectionNoteCount}
          />
          <AppHeaderProfileImageMe loginUser={loginUser} />

          {this.state.logingOut ? (
            <LoadingIcon text="logout" />
          ) : (
            <button
              id="appLogOutBtn-react"
              onClick={this.onLogoutClicked}
              className="btn btn-sm btn-warning app-header-logout-btn"
            >
              <FontAwesomeIcon icon="power-off" size="lg" />
            </button>
          )}
        </div>
      );
    }
    return (
      <div className="app-header-banner app-header-height">
        <div className="app-header app-container">
          <div className="appHeader-appIconContainer-leftSide app-header-height">
            <div className="appHeader-appIcon">Good Neighbor</div>
          </div>
          {content}
        </div>
      </div>
    );
  }
}
AppHeader.propTypes = {
  loginUser: PropTypes.instanceOf(User),
  onUserLogOut: PropTypes.func.isRequired,
  onInPostNav: PropTypes.func.isRequired,
  onOutPostNav: PropTypes.func.isRequired,
  onConnectionNav: PropTypes.func.isRequired,
  selectTab: PropTypes.instanceOf(AppTabEnum).isRequired,
  inPostNoteCount: nullOrRequiredValidator("number"),
  outPostNoteCount: nullOrRequiredValidator("number"),
  connectionNoteCount: nullOrRequiredValidator("number")
};

export { AppHeader };
