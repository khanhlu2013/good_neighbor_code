import React from "react";
import { Text } from "react-native";

import { createBottomTabNavigator } from "react-navigation";
import InPostScreen from "../../bus/inPost/screen/inPost.screen";

const dummyScreen = function() {
  return <Text>xxxxxx</Text>;
};

const dummyScreen2 = function() {
  return <Text>yyyyyy</Text>;
};

const PrivateApp = createBottomTabNavigator(
  {
    InPost: { screen: InPostScreen },
    Calendar: { screen: dummyScreen2 },
    Search: { screen: dummyScreen },
    Notifications: { screen: dummyScreen2 },
    Messages: { screen: dummyScreen }
  },
  {
    tabBarOptions: {
      activeTintColor: "white",
      activeBackgroundColor: "#7B3037",

      inactiveTintColor: "lightgrey",
      inactiveBackgroundColor: "#7B3037",

      showLabel: true,
      showIcon: true,
      style: {
        backgroundColor: "#7B3037"
      },
      tabStyle: {},
      labelStyle: {
        fontSize: 12
      }
    }
  }
);
// PrivateApp.navigationOptions = ({ navigation }) => ({
//   tabBarIcon: ({ focused, horizontal, tintColor }) => {
//     const { routeName } = navigation.state;
//     let iconName;
//     let iconSize;

//     iconSize = 25;

//     if (routeName === "Social") {
//       iconName = `ios-people${focused ? "" : "-outline"}`;
//     } else if (routeName === "Calendar") {
//       iconName = `ios-calendar${focused ? "" : "-outline"}`;
//     } else if (routeName === "Search") {
//       iconName = `ios-search${focused ? "" : "-outline"}`;
//       iconSize = 40;
//     } else if (routeName === "Notifications") {
//       iconName = `ios-notifications${focused ? "" : "-outline"}`;
//     } else if (routeName === "Messages") {
//       iconName = `ios-chatboxes${focused ? "" : "-outline"}`;
//     }
//     console.log("am i here?");
//     return <Ionicons name={iconName} size={iconSize} color={tintColor} />;
//   }
// });

export default PrivateApp;
