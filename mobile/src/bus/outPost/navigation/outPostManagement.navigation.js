import { createStackNavigator } from "react-navigation";
import OutPostManagementBottomTabNavigator from "../navigation/outPostManagementBottomTab.navigation";
import OutPostDecisionDialogScreen from "../screen/outPostDecisionDialog.screen";
import OutPostCrudDialogScreen from "../screen/outPostCrudDialog.screen";

const OutPostManagementNavigator = createStackNavigator(
  {
    outPost_crudDialog: OutPostCrudDialogScreen,
    outPost_decisionDialog: OutPostDecisionDialogScreen,
    outPost_bottomTab: OutPostManagementBottomTabNavigator
  },
  {
    initialRouteName: "outPost_bottomTab",
    headerMode: "none"
  }
);

export default OutPostManagementNavigator;
