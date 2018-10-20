import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import className from "classnames";

import "./tabItem.css";
import { nullOrRequiredValidator } from "../util";

function TabItem(props) {
  const {
    id,
    isSelect,
    caption,
    iconName,
    onSelect,
    notificationItem,

    selectCssClass,
    unSelectCssClass,
    hoverCssClass,
    underlineSelectCssClass,

    isCssResponsive
  } = props;

  const onItemClick = e => {
    onSelect();
  };

  return (
    <div
      id={id}
      className={className({
        "tab-item": true,
        "tab-item-responsive": isCssResponsive,
        [hoverCssClass]: true,
        [selectCssClass]: isSelect,
        [unSelectCssClass]: !isSelect
      })}
      onClick={onItemClick}
    >
      <div className="tab-item-icon-notification-caption">
        <div className="tab-item-icon-notification">
          <div
            className={className({
              "tab-item-icon": true,
              "tab-item-icon-responsive": isCssResponsive
            })}
          >
            {iconName && <FontAwesomeIcon icon={iconName} />}
          </div>
          {notificationItem}
        </div>
        <span
          className={className({
            "tab-item-caption": true,
            "tab-item-caption-responsive": isCssResponsive
          })}
        >
          {caption}
        </span>
      </div>
      <div
        className={className({
          "tab-item-underline": true,
          "tab-item-underline-responsive": isCssResponsive,
          [underlineSelectCssClass]: isSelect
        })}
      />
    </div>
  );
}

TabItem.propTypes = {
  id: PropTypes.string.isRequired,
  isSelect: PropTypes.bool.isRequired,
  caption: PropTypes.string.isRequired,
  iconName: nullOrRequiredValidator("string"),
  onSelect: PropTypes.func.isRequired,
  notificationItem: PropTypes.element.isRequired,
  selectCssClass: PropTypes.string.isRequired,
  unSelectCssClass: PropTypes.string.isRequired,
  hoverCssClass: PropTypes.string.isRequired,
  underlineSelectCssClass: PropTypes.string.isRequired,
  isCssResponsive: PropTypes.bool.isRequired
};

export { TabItem };
