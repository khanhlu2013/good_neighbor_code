import React from "react";
import ProfileManagementMobileView from "../view/profileManagement.mobileView";
import ProfileManagementController from "@gn/common/bus/profile/controller/profileManagement.controller";

function ProfileManagementScreen(props) {
  return <ProfileManagementController view={ProfileManagementMobileView} />;
}

export default ProfileManagementScreen;
