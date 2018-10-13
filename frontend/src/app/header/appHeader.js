import React from "react";
import PropTypes from "prop-types";

import { User } from "../../model/user";
import { GoogleLogin } from "../googleLogin";
import { nullOrRequiredValidator } from "../../util";
import { AppHeaderTabBar } from "./appHeaderTabBar";
import { LoadingIcon } from "../../util/loadingIcon";
import { AppTabEnum } from "../appTabEnum";
import "./appHeader.css";

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
    content = <LoadingIcon text="loading" />;
  } else if (loginUser === null) {
    content = <GoogleLogin />;
  } else {
    content = (
      <AppHeaderTabBar
        onAppTabChange={onAppTabChange}
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
