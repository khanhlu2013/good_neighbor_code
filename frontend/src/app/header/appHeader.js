import React from "react";
import PropTypes from "prop-types";

import "./appHeader.css";
import { User } from "../../model/user";
import { GoogleLogin } from "../googleLogin";
import { nullOrRequiredValidator } from "../../util";
import { AppHeaderTabBar } from "./appHeader_tabBar";
import { LoadingIcon } from "../../util/loadingIcon";
import { AppTabEnum } from "../appTabEnum";
import { AppHeaderAppIcon } from "./appHeader_appIcon";

function AppHeader(props) {
  const {
    loginUser,
    onAppTabChange,
    selectTab,
    inPostNoteCount,
    outPostNoteCount,
    connectionNoteCount
  } = props;

  let content;
  if (loginUser === undefined) {
    content = (
      <div className="appHeader-authCheck-container">
        <LoadingIcon text="loading" />
      </div>
    );
  } else if (loginUser === null) {
    content = (
      <div className="appHeader-googleLogIn-container">
        <GoogleLogin />
      </div>
    );
  } else {
    content = (
      <div className="appHeader-tabBar-container">
        <AppHeaderTabBar
          onAppTabChange={onAppTabChange}
          selectTab={selectTab}
          inPostNoteCount={inPostNoteCount}
          outPostNoteCount={outPostNoteCount}
          connectionNoteCount={connectionNoteCount}
        />
      </div>
    );
  }
  return (
    <div className="app-header-banner banner">
      <div className="app-header app-container">
        <div className="appHeader-appIcon-container">
          <AppHeaderAppIcon />
        </div>
        {content}
      </div>
    </div>
  );
}

AppHeader.propTypes = {
  loginUser: PropTypes.instanceOf(User),
  onUserDidLogOut: PropTypes.func.isRequired,
  onAppTabChange: PropTypes.func.isRequired,
  selectTab: PropTypes.instanceOf(AppTabEnum).isRequired,
  inPostNoteCount: nullOrRequiredValidator("number"),
  outPostNoteCount: nullOrRequiredValidator("number"),
  connectionNoteCount: nullOrRequiredValidator("number")
};

export { AppHeader };
