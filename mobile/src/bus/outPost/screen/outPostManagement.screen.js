import React from "react";

import OutPostManagementController from "../../../common/bus/outPost/controller/outPostManagement.controller";
import OutPostManagementMobileView from "../view/outPostManagement.mobileView";
import OutPostManagementNavigator from "../navigation/outPostManagement.navigation";

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
