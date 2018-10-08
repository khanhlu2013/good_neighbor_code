import React from "react";
import PropTypes from "prop-types";

import "./appHeaderNavBar.css";
import { nullOrRequiredValidator } from "../../util";
import { AppHeaderNavItem } from "./appHeaderNavItem";
import { NotificationItem } from "../../util/notificationItem";

function AppHeaderNavBar(props) {
  const {
    onInPostNav,
    onOutPostNav,
    onConnectionNav,
    isInOutCon1BaseIndexTabVisible,
    inPostNoteCount,
    outPostNoteCount,
    connectionNoteCount
  } = props;

  return (
    <div className="app-header-nav-bar">
      <AppHeaderNavItem
        isSelect={isInOutCon1BaseIndexTabVisible === 1}
        caption="friend posts"
        iconName="globe"
        onSelect={onInPostNav}
        notificationItem={
          <NotificationItem count={inPostNoteCount} isImportant={true} />
        }
      />

      <AppHeaderNavItem
        isSelect={isInOutCon1BaseIndexTabVisible === 2}
        caption="my posts"
        iconName="briefcase"
        onSelect={onOutPostNav}
        notificationItem={
          <NotificationItem count={outPostNoteCount} isImportant={true} />
        }
      />

      <AppHeaderNavItem
        isSelect={isInOutCon1BaseIndexTabVisible === 3}
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
  isInOutCon1BaseIndexTabVisible: PropTypes.number.isRequired,
  inPostNoteCount: nullOrRequiredValidator("number"),
  outPostNoteCount: nullOrRequiredValidator("number"),
  connectionNoteCount: nullOrRequiredValidator("number")
};

export { AppHeaderNavBar };
