import React from "react";
import { View } from "react-native";
import { Icon } from "native-base";
import AlertItemMobileView from "./alertItem.mobileView";

function TabItemMobileView(props) {
  const {
    iconName,
    iconProvider,
    iconSize,
    iconColor,
    iconCount,
    iconCountIsImportant
  } = props;
  return (
    <View style={{ flexDirection: "row" }}>
      <Icon
        name={iconName}
        type={iconProvider}
        style={{ fontSize: iconSize, color: iconColor }}
      />
      {iconCount !== null && iconCountIsImportant !== null && (
        <View style={{ marginLeft: 4, justifyContent: "center" }}>
          <AlertItemMobileView
            count={iconCount}
            isImportant={iconCountIsImportant}
          />
        </View>
      )}
    </View>
  );
}

export default TabItemMobileView;
