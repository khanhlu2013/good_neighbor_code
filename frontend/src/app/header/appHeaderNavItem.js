import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import className from "classnames";

import "./appHeaderNavItem.css";

function AppHeaderNavItem(props) {
  const { isSelect, caption, iconName, onSelect, notificationItem } = props;
  const onItemClick = e => {
    onSelect();
  };

  return (
    <div
      className={className({
        "app-header-nav-item": true,
        "app-header-nav-item-select": isSelect
      })}
      onClick={onItemClick}
    >
      <div className="app-header-nav-item-main">
        <div className="app-header-nav-item-icon-with-notification">
          <FontAwesomeIcon icon={iconName} size="lg" />
          {notificationItem}
        </div>
        <span className="app-header-nav-item-caption">{caption}</span>
      </div>
      <div
        className={className({
          "app-header-nav-item-underline": true,
          "app-header-nav-item-underline-select": isSelect
        })}
      />
    </div>
  );
}

AppHeaderNavItem.propTypes = {
  isSelect: PropTypes.bool.isRequired,
  caption: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  notificationItem: PropTypes.element.isRequired
};

export { AppHeaderNavItem };
