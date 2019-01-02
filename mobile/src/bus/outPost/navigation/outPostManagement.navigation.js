import { createStackNavigator } from "react-navigation";
import OutPostManagementBottomTabNavigator from "../navigation/outPostManagementBottomTab.navigation";
import CrudPostDialogScreen from "../screen/crudPostDialog.screen";
import DecisionPostDialogScreen from "../screen/decidePostDialog.screen";

const OutPostManagementNavigator = createStackNavigator(
  {
    outPost_crudDialog: CrudPostDialogScreen,
    outPost_decisionDialog: DecisionPostDialogScreen,
    outPost_bottomTab: OutPostManagementBottomTabNavigator
  },
  {
    initialRouteName: "outPost_bottomTab",
    headerMode: "none"
  }
);

export default OutPostManagementNavigator;
