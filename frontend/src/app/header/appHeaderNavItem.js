import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./appHeaderNavItem.css";
import { NotificationItem } from "../../util/notificationItem";
import { nullOrRequiredValidator } from "../../util";

function AppHeaderNavItem(props) {
  const { isSelect, caption, iconName, onSelect, noteCount } = props;
  const onItemClick = e => {
    onSelect();
  };

  return (
    <div className="app-header-nav-item" onClick={onItemClick}>
      <div className="app-header-nav-item-icon-with-notification">
        <FontAwesomeIcon icon={iconName} />
        <NotificationItem count={noteCount} />
      </div>
      <div>{caption}</div>
    </div>
  );
}

AppHeaderNavItem.propTypes = {
  isSelect: PropTypes.bool.isRequired,
  caption: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  noteCount: nullOrRequiredValidator("number")
};

export { AppHeaderNavItem };
