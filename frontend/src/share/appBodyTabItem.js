import React from "react";
import PropTypes from "prop-types";
import { TabItem } from "./tabItem";
import { nullOrRequiredValidator } from "./util";

function AppBodyTabItem(props) {
  const {
    id,
    isSelect,
    caption,
    iconName,
    onSelect,
    notificationItem,
    isResponsive
  } = props;

  return (
    <TabItem
      id={id}
      isSelect={isSelect}
      caption={caption}
      iconName={iconName}
      onSelect={onSelect}
      notificationItem={notificationItem}
      selectColor="maroon"
      unSelectColor="rgb(214, 174, 139)"
      hoverColor="maroon"
      undelineColor="maroon"
      isResponsive={isResponsive}
    />
  );
}

AppBodyTabItem.propTypes = {
  id: PropTypes.string.isRequired,
  isSelect: PropTypes.bool.isRequired,
  caption: PropTypes.string.isRequired,
  iconName: nullOrRequiredValidator("string"),
  onSelect: PropTypes.func.isRequired,
  notificationItem: PropTypes.element.isRequired,
  isResponsive: PropTypes.bool.isRequired
};

export default AppBodyTabItem;
