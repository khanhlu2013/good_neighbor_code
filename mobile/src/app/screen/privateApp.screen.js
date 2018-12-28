import React from "react";
import { Text } from "react-native";
import styled from "styled-components";
import { Constants } from "expo";
import { Header, Left, Right, Icon } from "native-base";

import PrivateAppMobileController from "../controller/privateApp.mobileController";
import PrivateAppNavigator, {
  PrivateAppRouteToTitleMapper
} from "../navigation/privateApp/privateApp.navigation";
import PrivateAppMobileView from "../view/privateApp.mobileView";

const Style = styled.View`
  margin-top: ${Constants.statusBarHeight};
  flex: 1;
`;

function PrivateAppScreen(props) {
  const { navigation } = props;
  const { routes: topRoutes, index: curTopRouteIndex } = navigation.state;

  const title = PrivateAppRouteToTitleMapper(
    topRoutes[curTopRouteIndex].routeName
  );

  return (
    <Style>
      <Header>
        <Left>
          <Icon name="ios-menu" onPress={() => navigation.toggleDrawer()} />
        </Left>
        <Right>
          <Text>{title}</Text>
        </Right>
      </Header>
      <PrivateAppMobileController
        navigation={navigation}
        view={PrivateAppMobileView}
      />
    </Style>
  );
}
PrivateAppScreen.router = PrivateAppNavigator.router;
export default PrivateAppScreen;
