import React from "react";
import { createDrawerNavigator } from "react-navigation";
import PropTypes from "prop-types";

import TabItemMobileView from "../../../share/tabItem.mobileView";
import { APP_ICON_SIZE } from "../../../share/uiConstant";
import InPostManagementController from "../../../common/bus/inPost/controller/inPostManagement.controller";
import InPostManagementMobileView from "../../../bus/inPost/view/inPostManagement.mobileView";
import OutPostManagementController from "../../../common/bus/outPost/controller/outPostManagement.controller";
import OutPostManagementMobileView from "../../../bus/outPost/outPostManagement.mobileView";
import PrivateAppNavigationDrawerView from "./navigationDrawer.view";
import InPostManagementNavigator from "../../../bus/inPost/navigation/inPostManagement.navigation";

const _createNavigationOption = (iconName, iconProvider) => {
  return ({ navigation, screenProps }) => {
    const { inPostsAlertCount, outPostsAlertCount } = screenProps;
    const { routeName } = navigation.state;
    let alertCount;
    switch (routeName) {
      case "inPost":
        alertCount = inPostsAlertCount;
        break;

      case "outPost":
        alertCount = outPostsAlertCount;
        break;

      default:
        alertCount = 0;
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
      )
    };
  };
};

const InPostManagementScreen = props => (
  <InPostManagementController
    navigation={props.navigation}
    view={InPostManagementMobileView}
  />
);
InPostManagementScreen.router = InPostManagementNavigator.router;

const PrivateAppNavigator = createDrawerNavigator(
  {
    inPost: {
      screen: InPostManagementScreen,
      navigationOptions: _createNavigationOption("ios-globe", "Ionicons")
    },
    outPost: {
      screen: props => (
        <OutPostManagementController view={OutPostManagementMobileView} />
      ),
      navigationOptions: _createNavigationOption("briefcase", "FontAwesome")
    }
  },
  {
    contentComponent: PrivateAppNavigationDrawerView,
    contentOptions: {
      activeTintColor: "orange"
    }
  }
);
PrivateAppNavigator.propTypes = {
  screenProps: PropTypes.shape({
    inPostsAlertCount: PropTypes.number.isRequired,
    outPostsAlertCount: PropTypes.number.isRequired
  }).isRequired
};

export default PrivateAppNavigator;
