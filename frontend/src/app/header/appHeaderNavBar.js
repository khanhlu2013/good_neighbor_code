import React from "react";
import PropTypes from "prop-types";

import "./appHeaderNavBar.css";
import { nullOrRequiredValidator } from "../../util";
import { AppHeaderNavItem } from "./appHeaderNavItem";
import { NotificationItem } from "../../util/notificationItem";
import { AppTabEnum } from "../appTabEnum";

function AppHeaderNavBar(props) {
  const {
    onInPostNav,
    onOutPostNav,
    onConnectionNav,
    selectTab,
    inPostNoteCount,
    outPostNoteCount,
    connectionNoteCount
  } = props;

  return (
    <div className="app-header-nav-bar">
      {_generateTabItem(
        selectTab === AppTabEnum.INPOST,
        "friend posts",
        "globe",
        onInPostNav,
        inPostNoteCount
      )}

      {_generateTabItem(
        selectTab === AppTabEnum.OUTPOST,
        "my posts",
        "briefcase",
        onOutPostNav,
        outPostNoteCount
      )}

      {_generateTabItem(
        selectTab === AppTabEnum.CONNECTION,
        "friends",
        "user-friends",
        onConnectionNav,
        connectionNoteCount
      )}
    </div>
  );
}

function _generateTabItem(isSelect, caption, iconName, onSelect, noteCount) {
  return (
    <AppHeaderNavItem
      isSelect={isSelect}
      caption={caption}
      iconName={iconName}
      onSelect={onSelect}
      notificationItem={
        <NotificationItem count={noteCount} isImportant={true} />
      }
      selectCssClass="app-header-tab-item-select"
      unSelectCssClass="app-header-tab-item-unSelect"
      hoverCssClass="app-header-tab-item-hover"
      underlineSelectCssClass="app-header-tab-item-underline-select"
    />
  );
}
AppHeaderNavBar.propTypes = {
  onInPostNav: PropTypes.func.isRequired,
  onOutPostNav: PropTypes.func.isRequired,
  onConnectionNav: PropTypes.func.isRequired,
  selectTab: PropTypes.instanceOf(AppTabEnum).isRequired,
  inPostNoteCount: nullOrRequiredValidator("number"),
  outPostNoteCount: nullOrRequiredValidator("number"),
  connectionNoteCount: nullOrRequiredValidator("number")
};

export { AppHeaderNavBar };
