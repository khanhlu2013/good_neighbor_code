import React from "react";
import PropTypes from "prop-types";

import "./appHeader_tabItem_customize.css";
import "./appHeader_tabBar.css";
import { nullOrRequiredValidator } from "../../util";
import { NotificationItem } from "../../util/notificationItem";
import { AppTabEnum } from "../appTabEnum";
import { TabItem } from "../../util/tabItem";

function AppHeaderTabBar(props) {
  const {
    onAppTabChange,
    selectTab,
    inPostNoteCount,
    outPostNoteCount,
    connectionNoteCount
  } = props;

  const onInPostNav = e => {
    onAppTabChange(AppTabEnum.INPOST);
  };
  const onOutPostNav = e => {
    onAppTabChange(AppTabEnum.OUTPOST);
  };
  const onConnectionNav = e => {
    onAppTabChange(AppTabEnum.CONNECTION);
  };
  const onProfileNav = e => {
    onAppTabChange(AppTabEnum.PROFILE);
  };

  return (
    <div className="tab-bar appHeader-tabBar">
      {_generateTabItem(
        "tabSelector-inPost-react",
        selectTab === AppTabEnum.INPOST,
        "friend posts",
        "globe",
        onInPostNav,
        inPostNoteCount
      )}

      {_generateTabItem(
        "tabSelector-outPost-react",
        selectTab === AppTabEnum.OUTPOST,
        "my posts",
        "briefcase",
        onOutPostNav,
        outPostNoteCount
      )}

      {_generateTabItem(
        "tabSelector-connection-react",
        selectTab === AppTabEnum.CONNECTION,
        "friends",
        "user-friends",
        onConnectionNav,
        connectionNoteCount
      )}
      {_generateTabItem(
        "tabSelector-profile-react",
        selectTab === AppTabEnum.PROFILE,
        "me",
        "user-cog",
        onProfileNav,
        0
      )}
    </div>
  );
}

function _generateTabItem(
  id,
  isSelect,
  caption,
  iconName,
  onSelect,
  noteCount
) {
  return (
    <div className="app-header-tab-item-container">
      <TabItem
        id={id}
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
        isCssResponsive={true}
      />
    </div>
  );
}
AppHeaderTabBar.propTypes = {
  onAppTabChange: PropTypes.func.isRequired,
  selectTab: PropTypes.instanceOf(AppTabEnum).isRequired,
  inPostNoteCount: nullOrRequiredValidator("number"),
  outPostNoteCount: nullOrRequiredValidator("number"),
  connectionNoteCount: nullOrRequiredValidator("number")
};

export { AppHeaderTabBar };
