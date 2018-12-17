import React from "react";
import styled from "styled-components";
import InPostManagementMobileView from "../view/inPostManagement.mobileView";
import { Constants } from "expo";
import { Header, Left, Right, Icon } from "native-base";
import InPostManagementController from "../../../common/bus/inPost/controller/inPostManagement.controller";

const Style = styled.View`
  margin-top: ${Constants.statusBarHeight};
  flex: 1;
`;

const InPostManagementScreen = function(props) {
  return (
    <Style>
      <Header>
        <Left>
          <Icon name="ios-menu" onPress={() => props.navigation.openDrawer()} />
        </Left>
      </Header>
      <InPostManagementController view={InPostManagementMobileView} />
    </Style>
  );
};
InPostManagementScreen.navigationOptions = {
  drawerIcon: ({ tintColor }) => (
    <Icon name="ios-globe" style={{ fontSize: 24, color: tintColor }} />
  )
};
export default InPostManagementScreen;
