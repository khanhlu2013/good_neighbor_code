import React from "react";
import { View, Text } from "react-native";
import { Icon } from "native-base";
import { APP_ICON_SIZE } from "../../share/uiConstant";

function OutPostManagementScreen(props) {
  return (
    <View>
      <Text>Out post management screen</Text>
    </View>
  );
}

OutPostManagementScreen.navigationOptions = {
  title: "My posts",
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="briefcase"
      type="FontAwesome"
      style={{ fontSize: APP_ICON_SIZE, color: tintColor }}
    />
  )
};

export default OutPostManagementScreen;
