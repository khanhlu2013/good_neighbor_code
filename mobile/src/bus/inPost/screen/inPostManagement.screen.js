import React from "react";
import styled from "styled-components";
import InPostManagementMobileView from "../view/inPostManagement.mobileView";
import InPostManagementController from "../controller/inPostManagement.controller";
import { Constants } from "expo";

const Style = styled.View`
  margin-top: ${Constants.statusBarHeight};
  padding: 10px;
`;

const InPostManagementScreen = function() {
  return (
    <Style>
      <InPostManagementController view={InPostManagementMobileView} />
    </Style>
  );
};

export default InPostManagementScreen;
