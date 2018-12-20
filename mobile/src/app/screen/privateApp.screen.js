import React from "react";
import { Text, SafeAreaView, ScrollView, View } from "react-native";
import styled from "styled-components";
import { Constants } from "expo";
import { Header, Left, Right, Icon } from "native-base";

import { createDrawerNavigator, DrawerItems } from "react-navigation";
import OutPostManagementScreen from "../../bus/outPost/outPostManagement.screen";
import { APP_ICON_SIZE } from "../../share/uiConstant";
import InPostManagementController from "../../common/bus/inPost/controller/inPostManagement.controller";
import InPostManagementMobileView from "../../bus/inPost/view/inPostManagement.mobileView";

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

const _createNavigationOption = (title, iconName, iconType) => ({
  title,
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
  return (
    <ScreenStyle>
      <Header>
        <Left>
          <Icon name="ios-menu" onPress={() => navigation.openDrawer()} />
        </Left>
      </Header>
      {children}
    </ScreenStyle>
  );
}

const PrivateApp = createDrawerNavigator(
  {
    inPost: {
      screen: props => (
        <ScreenTemplate {...props}>
          <InPostManagementController view={InPostManagementMobileView} />
        </ScreenTemplate>
      ),
      navigationOptions: _createNavigationOption(
        "Friend posts",
        "ios-globe",
        "Ionicons"
      )
    },
    outPost: { screen: OutPostManagementScreen },
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
