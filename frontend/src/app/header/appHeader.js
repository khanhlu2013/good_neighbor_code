import React, { Component } from "react";
import PropTypes from "prop-types";

import { User } from "../../model/user";
import { GoogleLogin } from "../googleLogin";
import { AppHeaderProfile } from "./appHeaderProfile";
import { nullOrRequiredValidator } from "../../util";
import "./appHeader.css";
import { AppHeaderNavBar } from "./appHeaderNavBar";
import { LoadingIcon } from "../../util/loadingIcon";

class AppHeader extends Component {
  render() {
    const {
      loginUser,
      onLogOut,
      onInPostNav,
      onOutPostNav,
      onConnectionNav,
      isInOutCon1BaseIndexTabVisible,
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
          <AppHeaderNavBar
            onInPostNav={onInPostNav}
            onOutPostNav={onOutPostNav}
            onConnectionNav={onConnectionNav}
            isInOutCon1BaseIndexTabVisible={isInOutCon1BaseIndexTabVisible}
            inPostNoteCount={inPostNoteCount}
            outPostNoteCount={outPostNoteCount}
            connectionNoteCount={connectionNoteCount}
          />
          <AppHeaderProfile loginUser={loginUser} onLogOut={onLogOut} />
        </div>
      );
    }
    return (
      <div className="app-header-container">
        <div className="app-header app-container">
          <div className="app-header-text-icon">Good Neighbor</div>
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
  isInOutCon1BaseIndexTabVisible: PropTypes.number.isRequired,
  inPostNoteCount: nullOrRequiredValidator("number"),
  outPostNoteCount: nullOrRequiredValidator("number"),
  connectionNoteCount: nullOrRequiredValidator("number")
};

export { AppHeader };
