import React, { Component } from "react";
import PropTypes from "prop-types";

import { API } from "../../api/profile-api";
import { User } from "../../model/user";
import { GoogleLogin } from "../googleLogin";
import { nullOrRequiredValidator } from "../../util";
import { AppHeaderTabBar } from "./appHeaderTabBar";
import { LoadingIcon } from "../../util/loadingIcon";
import { AppTabEnum } from "../appTabEnum";
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
      this.props.onUserDidLogOut();
    })();
  };

  render() {
    const {
      loginUser,
      onInPostNav,
      onOutPostNav,
      onConnectionNav,
      onProfileNav,
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
        <AppHeaderTabBar
          onInPostNav={onInPostNav}
          onOutPostNav={onOutPostNav}
          onConnectionNav={onConnectionNav}
          onProfileNav={onProfileNav}
          selectTab={selectTab}
          inPostNoteCount={inPostNoteCount}
          outPostNoteCount={outPostNoteCount}
          connectionNoteCount={connectionNoteCount}
        />
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
  onUserDidLogOut: PropTypes.func.isRequired,
  onInPostNav: PropTypes.func.isRequired,
  onOutPostNav: PropTypes.func.isRequired,
  onConnectionNav: PropTypes.func.isRequired,
  onProfileNav: PropTypes.func.isRequired,
  selectTab: PropTypes.instanceOf(AppTabEnum).isRequired,
  inPostNoteCount: nullOrRequiredValidator("number"),
  outPostNoteCount: nullOrRequiredValidator("number"),
  connectionNoteCount: nullOrRequiredValidator("number")
};

export { AppHeader };
