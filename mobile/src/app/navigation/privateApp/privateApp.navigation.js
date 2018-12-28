import React from "react";
import { createDrawerNavigator } from "react-navigation";
import { Text } from "react-native";
import { Header, Left, Right, Icon } from "native-base";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Constants } from "expo";

import TabItemMobileView from "../../../share/tabItem.mobileView";
import { APP_ICON_SIZE } from "../../../share/uiConstant";
import InPostManagementController from "../../../common/bus/inPost/controller/inPostManagement.controller";
import InPostManagementMobileView from "../../../bus/inPost/view/inPostManagement.mobileView";
import OutPostManagementController from "../../../common/bus/outPost/controller/outPostManagement.controller";
import OutPostManagementMobileView from "../../../bus/outPost/outPostManagement.mobileView";
import PrivateAppNavigationDrawerView from "./navigationDrawer.view";
import InPostManagementNavigator from "../../../bus/inPost/navigation/inPostManagement.navigation";

const _createNavigationOption = (iconName, iconProvider, title) => {
  return ({ navigation, screenProps }) => {
    const { inPostsAlertCount, outPostsAlertCount } = screenProps;
    const { routeName } = navigation.state;
    let alertCount;
    switch (routeName) {
      case "inPost":
        alertCount = inPostsAlertCount;
        break;

      case "outPost":
        alertCount = outPostsAlertCount;
        break;

      default:
        alertCount = 0;
    }
    return {
      drawerIcon: ({ tintColor }) => (
        <TabItemMobileView
          iconName={iconName}
          iconProvider={iconProvider}
          iconSize={APP_ICON_SIZE}
          iconColor={tintColor}
          iconCount={alertCount}
          iconCountIsImportant={true}
        />
      ),
      title
    };
  };
};

const inPostRouteTitle = "Friend Posts";
const outPostRouteTitle = "My Posts";

const ScreenStyle = styled.View`
  margin-top: ${Constants.statusBarHeight};
  flex: 1;
`;

function ScreenTemplate(props) {
  const { children, navigation, routeTitle } = props;
  return (
    <ScreenStyle>
      <Header>
        <Left>
          <Icon name="ios-menu" onPress={() => navigation.openDrawer()} />
        </Left>
        <Right>
          <Text>{routeTitle}</Text>
        </Right>
      </Header>
      {children}
    </ScreenStyle>
  );
}
ScreenTemplate.propTypes = {
  navigation: PropTypes.object.isRequired
};

const InPostManagementScreen = props => (
  <ScreenTemplate navigation={props.navigation} routeTitle={inPostRouteTitle}>
    <InPostManagementController
      navigation={props.navigation}
      view={InPostManagementMobileView}
    />
  </ScreenTemplate>
);
InPostManagementScreen.router = InPostManagementNavigator.router;

const PrivateAppNavigator = createDrawerNavigator(
  {
    inPost: {
      screen: InPostManagementScreen,
      navigationOptions: _createNavigationOption(
        "ios-globe",
        "Ionicons",
        inPostRouteTitle
      )
    },
    outPost: {
      screen: props => (
        <ScreenTemplate
          navigation={props.navigation}
          routeTitle={outPostRouteTitle}
        >
          <OutPostManagementController view={OutPostManagementMobileView} />
        </ScreenTemplate>
      ),
      navigationOptions: _createNavigationOption(
        "briefcase",
        "FontAwesome",
        outPostRouteTitle
      )
    }
  },
  {
    contentComponent: PrivateAppNavigationDrawerView,
    contentOptions: {
      activeTintColor: "orange"
    }
  }
);
PrivateAppNavigator.propTypes = {
  screenProps: PropTypes.shape({
    inPostsAlertCount: PropTypes.number.isRequired,
    outPostsAlertCount: PropTypes.number.isRequired
  }).isRequired
};

export default PrivateAppNavigator;
