import React, { Component } from "react";
import { Text } from "react-native";

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

class OutPostManagementMobileView extends Component {
  onUpdatePostClick = postId => {
    this.props.navigation.navigate("outPost_crudDialog");
  };

  onDecidePostClick = postId => {
    this.props.navigation.navigate("outPost_decisionDialog");
  };

  render() {
    const {
      navigation,
      posts,
      requestAlertPosts,
      awaringReturnPostIds,
      onAwareReturnPostClick
    } = this.props;
    const screenProps = {
      posts,
      requestAlertPosts,
      awaringReturnPostIds,
      onUpdatePostClick: this.onUpdatePostClick,
      onDecidePostClick: this.onDecidePostClick,
      onAwareReturnPostClick
    };
    return (
      <OutPostManagementNavigator
        screenProps={screenProps}
        navigation={navigation}
      />
    );
  }
}

function OutPostManagementScreen(props) {
  return (
    <OutPostManagementController
      navigation={props.navigation}
      view={OutPostManagementMobileView}
    />
  );
}
OutPostManagementScreen.router = OutPostManagementNavigator.router;

export default OutPostManagementScreen;
