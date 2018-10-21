import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import { nullOrRequiredValidator } from "../util";
const responsiveBreakPoint = "500px";

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

const IconAndNotificationWrap = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrap = styled.div`
  font-size: 1.5em;
  line-height: 100%;
  ${props =>
    props.isResponsive &&
    `@media screen and (max-width: ${responsiveBreakPoint}) { font-size: 1.8em !important;}`};
`;

const CaptionWrap = styled.div`
  margin-top: 6px;
  font-weight: 100;
  font-size: 0.8em;
  line-height: 100%;
  ${props =>
    props.isResponsive &&
    `@media screen and (max-width: ${responsiveBreakPoint}) { display: none;}`};
`;

const Underline = styled.div`
  margin-top: 3px;
  height: 3px;
  width: 100%;
  background-color: ${props => props.isSelect && props.selectColor};
  ${props =>
    props.isResponsive &&
    `@media screen and (max-width: ${responsiveBreakPoint}) { margin-top: 9px !important;}`};
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
      <IconAndNotificationWrap>
        {iconName && (
          <IconWrap isResponsive={isResponsive}>
            <FontAwesomeIcon icon={iconName} />
          </IconWrap>
        )}
        {notificationItem}
      </IconAndNotificationWrap>
      <CaptionWrap isResponsive={isResponsive}>{caption}</CaptionWrap>
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
