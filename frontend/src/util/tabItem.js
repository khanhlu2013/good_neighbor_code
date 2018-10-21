import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import className from "classnames";
import styled from "styled-components";

import "./tabItem.css";
import { nullOrRequiredValidator } from "../util";

const Wrap = styled.div`
  user-select: none;
  cursor: pointer;
  color: ${props => (props.isSelect ? props.selectColor : props.unSelectColor)};
  :hover {
    color: ${props => props.hoverColor};
  }

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Underline = styled.div`
  margin-top: 3px;
  height: 3px;
  width: 100%;
  background-color: ${props => props.isSelect && props.selectColor};
  ${props =>
    props.isResponsive &&
    "@media screen and (max-width: 500px) { margin-top: 9px !important;}"};
`;

function TabItem(props) {
  const {
    id,
    isSelect,
    caption,
    iconName,
    onSelect,
    notificationItem,
    selectColor,
    unSelectColor,
    hoverColor,
    undelineColor,
    isResponsive
  } = props;

  const onItemClick = e => {
    onSelect();
  };

  return (
    <Wrap
      id={id}
      onClick={onItemClick}
      selectColor={selectColor}
      unSelectColor={unSelectColor}
      hoverColor={hoverColor}
      undelineColor={undelineColor}
      isSelect={isSelect}
    >
      <div className="tab-item-icon-notification-caption">
        <div className="tab-item-icon-notification">
          <div
            className={className({
              "tab-item-icon": true,
              "tab-item-icon-responsive": isResponsive
            })}
          >
            {iconName && <FontAwesomeIcon icon={iconName} />}
          </div>
          {notificationItem}
        </div>
        <span
          className={className({
            "tab-item-caption": true,
            "tab-item-caption-responsive": isResponsive
          })}
        >
          {caption}
        </span>
      </div>
      <Underline
        selectColor={selectColor}
        isSelect={isSelect}
        isResponsive={isResponsive}
      />
    </Wrap>
  );
}

TabItem.propTypes = {
  id: PropTypes.string.isRequired,
  isSelect: PropTypes.bool.isRequired,
  caption: PropTypes.string.isRequired,
  iconName: nullOrRequiredValidator("string"),
  onSelect: PropTypes.func.isRequired,
  notificationItem: PropTypes.element.isRequired,
  selectColor: PropTypes.string.isRequired,
  unSelectColor: PropTypes.string.isRequired,
  hoverColor: PropTypes.string.isRequired,
  undelineColor: PropTypes.string.isRequired,
  isResponsive: PropTypes.bool.isRequired
};

export { TabItem };
