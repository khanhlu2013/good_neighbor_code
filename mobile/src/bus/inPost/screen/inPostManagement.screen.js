import React from "react";
import InPostManagementWebView from "../view/inPostManagement.view";
import InPostManagementController from "../controller/inPostManagement.controller";

const InPostManagementScreen = function() {
  return <InPostManagementController view={InPostManagementWebView} />;
};

export default InPostManagementScreen;
