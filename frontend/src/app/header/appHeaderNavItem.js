import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import className from "classnames";

import "./appHeaderNavItem.css";
import { nullOrRequiredValidator } from "../../util";

function AppHeaderNavItem(props) {
  const {
    isSelect,
    caption,
    iconName,
    onSelect,
    notificationItem,
    selectCssClass,
    unSelectCssClass,
    hoverCssClass,
    underlineSelectCssClass,
    isResponsiveCaption
  } = props;

  const onItemClick = e => {
    onSelect();
  };

  return (
    <div
      className={className({
        "tab-item": true,
        [hoverCssClass]: true,
        [selectCssClass]: isSelect,
        [unSelectCssClass]: !isSelect
      })}
      onClick={onItemClick}
    >
      <div className="tab-item-icon-notification-caption">
        <div className="tab-item-icon-notification">
          {iconName && <FontAwesomeIcon icon={iconName} size="lg" />}
          {notificationItem}
        </div>
        <span
          className={className({
            "tab-item-caption": true,
            "tab-item-caption-responsive": isResponsiveCaption
          })}
        >
          {caption}
        </span>
      </div>
      <div
        className={className({
          "tab-item-underline": true,
          ...(underlineSelectCssClass !== null && {
            [underlineSelectCssClass]: isSelect
          })
        })}
      />
    </div>
  );
}

AppHeaderNavItem.propTypes = {
  isSelect: PropTypes.bool.isRequired,
  caption: PropTypes.string.isRequired,
  iconName: nullOrRequiredValidator("string"),
  onSelect: PropTypes.func.isRequired,
  notificationItem: PropTypes.element.isRequired,
  selectCssClass: PropTypes.string.isRequired,
  unSelectCssClass: PropTypes.string.isRequired,
  hoverCssClass: PropTypes.string.isRequired,
  underlineSelectCssClass: nullOrRequiredValidator("string"), //if null underline is transparent
  isResponsiveCaption: PropTypes.bool.isRequired
};

export { AppHeaderNavItem };
