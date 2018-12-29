import React from "react";

import OutPostManagementController from "../../../common/bus/outPost/controller/outPostManagement.controller";
import { createStackNavigator } from "react-navigation";
import OutPostManagementBottomTabNavigator from "../navigation/outPostManagementBottomTab.navigation";

const CrudPostDialog = props => <Text>out post crud dialog</Text>;
const DecisionPostDialog = props => <Text>out post decide dialog</Text>;

const OutPostManagementNavigator = createStackNavigator(
  {
    outPost_crudDialog: CrudPostDialog,
    outPost_decisionDialog: DecisionPostDialog,
    outPost_bottomTab: OutPostManagementBottomTabNavigator
  },
  {
    initialRouteName: "outPost_bottomTab"
  }
);

const View = props => {
  const { posts, requestAlertPosts } = props;
  const screenProps = {
    posts,
    requestAlertPosts
  };
  return (
    <OutPostManagementNavigator
      screenProps={screenProps}
      navigation={props.navigation}
    />
  );
};

function OutPostManagementScreen(props) {
  return (
    <OutPostManagementController navigation={props.navigation} view={View} />
  );
}
OutPostManagementScreen.router = OutPostManagementNavigator.router;

export default OutPostManagementScreen;
