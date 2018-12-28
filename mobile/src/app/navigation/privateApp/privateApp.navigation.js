import { createDrawerNavigator } from "react-navigation";
import PropTypes from "prop-types";

import PrivateAppNavigationDrawerView from "./navigationDrawer.view";
import InPostManagementScreen from "../../../bus/inPost/screen/inPostManagement.screen";
import { createPrivateAppNavigationOption } from "./privateApp.navigationHelper";
import OutPostManagementScreen from "../../../bus/outPost/screen/outPostManagement.screen";

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
      screen: OutPostManagementScreen,
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
