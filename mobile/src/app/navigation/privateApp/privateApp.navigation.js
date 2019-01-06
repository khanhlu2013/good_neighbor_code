import React from "react";
import PropTypes from "prop-types";
import { createDrawerNavigator } from "react-navigation";

import InPostManagementScreen from "../../../bus/inPost/screen/inPostManagement.screen";
import OutPostManagementScreen from "../../../bus/outPost/screen/outPostManagement.screen";
import PrivateAppNavigationMasterDrawerView from "./navigationMasterDrawer.view";
import ConnectionManagementScreen from "../../../bus/connection/screen/connectionManagement.screen";
import { APP_ICON_SIZE } from "../../../share/uiConstant";
import TabItemMobileView from "../../../share/tabItem.mobileView";

export function PrivateAppRouteToTitleMapper(routeName) {
  switch (routeName) {
    case "inPost":
      return "Friend Posts";

    case "outPost":
      return "My Posts";

    case "connection":
      return "Friends";

    default:
      throw Error(`Unexpected '${routeName}' for routeName`);
  }
}

const PrivateAppNavigator = createDrawerNavigator(
  {
    inPost: {
      screen: InPostManagementScreen,
      navigationOptions: createPrivateAppNavigationOption(
        "ios-globe",
        "Ionicons"
      )
    },
    outPost: {
      screen: OutPostManagementScreen,
      navigationOptions: createPrivateAppNavigationOption(
        "briefcase",
        "FontAwesome"
      )
    },
    connection: {
      screen: ConnectionManagementScreen,
      navigationOptions: createPrivateAppNavigationOption(
        "users",
        "FontAwesome"
      )
    }
  },
  {
    contentComponent: PrivateAppNavigationMasterDrawerView,
    contentOptions: {
      activeTintColor: "orange"
    }
  }
);
PrivateAppNavigator.propTypes = {
  screenProps: PropTypes.shape({
    inPostsAlertCount: PropTypes.number.isRequired,
    outPostsAlertCount: PropTypes.number.isRequired,
    connectionAlertCount: PropTypes.number.isRequired
  }).isRequired
};

export default PrivateAppNavigator;

// - helper ---
function createPrivateAppNavigationOption(iconName, iconProvider) {
  return ({ navigation, screenProps }) => {
    const {
      inPostsAlertCount,
      outPostsAlertCount,
      connectionAlertCount
    } = screenProps;
    const { routeName } = navigation.state;
    let alertCount;
    switch (routeName) {
      case "inPost":
        alertCount = inPostsAlertCount;
        break;

      case "outPost":
        alertCount = outPostsAlertCount;
        break;

      case "connection":
        alertCount = connectionAlertCount;
        break;

      default:
        throw Error(`Unexpected '${routeName}' for routeName`);
    }
    return {
      drawerIcon: ({ tintColor }) => (
        <TabItemMobileView
          iconName={iconName}
          iconProvider={iconProvider}
          iconSize={APP_ICON_SIZE}
          iconColor={tintColor}
          iconCount={alertCount}
          iconCountIsImportant={true}
        />
      ),
      title: PrivateAppRouteToTitleMapper(routeName)
    };
  };
}
