import React, { Component } from "react";
import PropTypes from "prop-types";

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
  render() {
    const {
      loginUser,
      onLogOut,
      onInPostNav,
      onOutPostNav,
      onConnectionNav,
      selectTab,
      inPostNoteCount,
      outPostNoteCount,
      connectionNoteCount
    } = this.props;

    const onLogoutClicked = e => {
      onLogOut();
    };

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
          <button
            onClick={onLogoutClicked}
            className="btn btn-sm btn-warning app-header-logout-btn"
          >
            <FontAwesomeIcon icon="power-off" size="lg" />
          </button>
        </div>
      );
    }
    return (
      <div className="app-header-banner">
        <div className="app-header app-container">
          <div className="app-header-left-side">Good Neighbor</div>
          {content}
        </div>
      </div>
    );
  }
}
AppHeader.propTypes = {
  loginUser: PropTypes.instanceOf(User),
  onLogOut: PropTypes.func.isRequired,
  onInPostNav: PropTypes.func.isRequired,
  onOutPostNav: PropTypes.func.isRequired,
  onConnectionNav: PropTypes.func.isRequired,
  selectTab: PropTypes.instanceOf(AppTabEnum).isRequired,
  inPostNoteCount: nullOrRequiredValidator("number"),
  outPostNoteCount: nullOrRequiredValidator("number"),
  connectionNoteCount: nullOrRequiredValidator("number")
};

export { AppHeader };
