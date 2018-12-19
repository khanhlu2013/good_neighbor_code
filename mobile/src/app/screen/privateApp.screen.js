import React from "react";
import { Text, SafeAreaView, ScrollView, View } from "react-native";

import { createDrawerNavigator, DrawerItems } from "react-navigation";
import InPostManagementScreen from "../../bus/inPost/inPostManagement.screen";
import OutPostManagementScreen from "../../bus/outPost/outPostManagement.screen";

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

const PrivateApp = createDrawerNavigator(
  {
    inPost: { screen: InPostManagementScreen },
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
