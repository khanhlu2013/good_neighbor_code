import React from "react";
import InPostManagementController from "../../../common/bus/inPost/controller/inPostManagement.controller";
import InPostManagementMobileView from "../view/inPostManagement.mobileView";
import InPostManagementNavigator from "../navigation/inPostManagement.navigation";

const InPostManagementScreen = props => (
  <InPostManagementController
    navigation={props.navigation}
    view={InPostManagementMobileView}
  />
);
InPostManagementScreen.router = InPostManagementNavigator.router;

export default InPostManagementScreen;
