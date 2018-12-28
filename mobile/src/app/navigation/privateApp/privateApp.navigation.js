import React from "react";
import { createDrawerNavigator } from "react-navigation";
import PropTypes from "prop-types";

import OutPostManagementController from "../../../common/bus/outPost/controller/outPostManagement.controller";
import OutPostManagementMobileView from "../../../bus/outPost/outPostManagement.mobileView";
import PrivateAppNavigationDrawerView from "./navigationDrawer.view";
import { createPrivateAppNavigationOption } from "./privateApp.navigationHelper";
import InPostManagementScreen from "../../../bus/inPost/screen/inPostManagement.screen";

export function PrivateAppRouteToTitleMapper(routeName) {
  switch (routeName) {
    case "inPost":
      return "Friend Posts";

    case "outPost":
      return "My Posts";

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
      screen: props => (
        <OutPostManagementController view={OutPostManagementMobileView} />
      ),
      navigationOptions: createPrivateAppNavigationOption(
        "briefcase",
        "FontAwesome"
      )
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
