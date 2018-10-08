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
      <AppHeaderNavItem
        isSelect={selectTab === AppTabEnum.INPOST}
        caption="friend posts"
        iconName="globe"
        onSelect={onInPostNav}
        notificationItem={
          <NotificationItem count={inPostNoteCount} isImportant={true} />
        }
      />

      <AppHeaderNavItem
        isSelect={selectTab === AppTabEnum.OUTPOST}
        caption="my posts"
        iconName="briefcase"
        onSelect={onOutPostNav}
        notificationItem={
          <NotificationItem count={outPostNoteCount} isImportant={true} />
        }
      />

      <AppHeaderNavItem
        isSelect={selectTab === AppTabEnum.CONNECTION}
        caption="friends"
        iconName="user-friends"
        onSelect={onConnectionNav}
        notificationItem={
          <NotificationItem count={connectionNoteCount} isImportant={true} />
        }
      />
    </div>
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
