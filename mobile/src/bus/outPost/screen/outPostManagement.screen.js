import React from "react";

import OutPostManagementController from "../../../common/bus/outPost/controller/outPostManagement.controller";
import OutPostManagementMobileView from "../outPostManagement.mobileView";
import OutPostManagementNavigator from "../navigation/outPostManagement.navigation";

function OutPostManagementScreen(props) {
  const { navigation } = props;
  return (
    <OutPostManagementController
      navigation={navigation}
      view={OutPostManagementMobileView}
    />
  );
}
OutPostManagementScreen.router = OutPostManagementNavigator.router;

export default OutPostManagementScreen;
