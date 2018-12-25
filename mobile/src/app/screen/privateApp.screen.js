import React from "react";
import PropTypes from "prop-types";
import { Text, SafeAreaView, ScrollView, View } from "react-native";
import styled from "styled-components";
import { Constants } from "expo";
import { Header, Left, Right, Icon } from "native-base";

import { createDrawerNavigator, DrawerItems } from "react-navigation";
import { APP_ICON_SIZE } from "../../share/uiConstant";
import InPostManagementController from "../../common/bus/inPost/controller/inPostManagement.controller";
import InPostManagementMobileView from "../../bus/inPost/view/inPostManagement.mobileView";
import OutPostManagementMobileView from "../../bus/outPost/outPostManagement.mobileView";
import OutPostManagementController from "../../common/bus/outPost/controller/outPostManagement.controller";

const dummyScreen = function() {
  return <Text>xxxxxx</Text>;
};

const dummyScreen2 = function() {
  return <Text>yyyyyy</Text>;
};

const CustomDrawerComponent = props => (
  <SafeAreaView style={{ flex: 1 }}>
    <View
      style={{
        height: 150,
        backgroundColor: "lime",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Text style={{ fontSize: 20 }}>Good Neighbor</Text>
    </View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
);

const _createNavigationOption = (iconName, iconType) => ({
  drawerIcon: ({ tintColor }) => (
    <Icon
      name={iconName}
      type={iconType}
      style={{ fontSize: APP_ICON_SIZE, color: tintColor }}
    />
  )
});

const ScreenStyle = styled.View`
  margin-top: ${Constants.statusBarHeight};
  flex: 1;
`;

function ScreenTemplate(props) {
  const { children, navigation } = props;
  console.group(JSON.stringify(navigation.state));
  return (
    <ScreenStyle>
      <Header>
        <Left>
          <Icon name="ios-menu" onPress={() => navigation.openDrawer()} />
        </Left>
        <Right>
          <Text>{navigation.state.routeName}</Text>
        </Right>
      </Header>
      {children}
    </ScreenStyle>
  );
}
ScreenTemplate.propTypes = {
  navigation: PropTypes.object.isRequired
};

const PrivateApp = createDrawerNavigator(
  {
    inPost: {
      screen: props => (
        <ScreenTemplate navigation={props.navigation}>
          <InPostManagementController view={InPostManagementMobileView} />
        </ScreenTemplate>
      ),
      navigationOptions: _createNavigationOption("ios-globe", "Ionicons")
    },
    outPost: {
      screen: props => (
        <ScreenTemplate navigation={props.navigation}>
          <OutPostManagementController view={OutPostManagementMobileView} />
        </ScreenTemplate>
      ),
      navigationOptions: _createNavigationOption("briefcase", "FontAwesome")
    },
    Search: { screen: dummyScreen },
    Notifications: { screen: dummyScreen2 },
    Messages: { screen: dummyScreen }
  },
  {
    contentComponent: CustomDrawerComponent,
    contentOptions: {
      activeTintColor: "orange"
    }
  }
);

export default PrivateApp;
