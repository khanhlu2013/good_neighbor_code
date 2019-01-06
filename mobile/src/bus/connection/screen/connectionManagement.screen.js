import React from "react";

import ConnectionManagementMobileView from "../view/connectionManagement.mobileView";
import ConnectionManagementNavigator from "../navigation/connectionManagement.navigation";
import ConnectionManagementController from "@gn/common/bus/connection/controller/connectionManagement.controller";

function ConnectionManagementScreen(props) {
  return (
    <ConnectionManagementController
      navigation={props.navigation}
      view={ConnectionManagementMobileView}
    />
  );
}
ConnectionManagementScreen.router = ConnectionManagementNavigator.router;
export default ConnectionManagementScreen;
