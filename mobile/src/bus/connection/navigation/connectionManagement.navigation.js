import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import { Text } from "native-base";
import FriendConnectionScreen from "../screen/friendConnection.screen";
import DenyConnectionScreen from "../screen/denyConnection.screen";
import InConnectionScreen from "../screen/inConnection.screen";
import OutConnectionScreen from "../screen/outConnection.screen";
import TabItemMobileView from "../../../share/tabItem.mobileView";
import { BUSINESS_ICON_SIZE } from "../../../share/uiConstant";
import ConnectionFilter from "../../../../../common/bus/connection/connection.filter";
import SearchByEmailScreen from "../screen/searchByEmail.screen";

const ConnectionManagementNavigator = createBottomTabNavigator(
  {
    connection_search: {
      screen: SearchByEmailScreen,
      navigationOptions: { title: "search" }
    },
    connection_friend: {
      screen: FriendConnectionScreen,
      navigationOptions: { title: "friend" }
    },
    connection_out: {
      screen: OutConnectionScreen,
      navigationOptions: { title: "my request" }
    },
    connection_in: {
      screen: InConnectionScreen,
      navigationOptions: { title: "friend request" }
    },
    connection_deny: {
      screen: DenyConnectionScreen,
      navigationOptions: { title: "deny" }
    }
  },
  {
    defaultNavigationOptions: ({ navigation, screenProps }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { connections, loginUser } = screenProps;

        const { routeName } = navigation.state;
        let iconName;
        let iconProvider;
        let count;
        let isImportant;

        switch (routeName) {
          case "connection_search":
            iconName = "search";
            iconProvider = "FontAwesome";
            count = 0;
            isImportant = false;
            break;
          case "connection_friend":
            iconName = "users";
            iconProvider = "FontAwesome";
            count = ConnectionFilter.friend(connections, loginUser.id).length;
            isImportant = false;
            break;
          case "connection_out":
            iconName = "sign-out";
            iconProvider = "FontAwesome";
            count = ConnectionFilter.out(connections, loginUser.id).length;
            isImportant = false;
            break;
          case "connection_in":
            iconName = "sign-in";
            iconProvider = "FontAwesome";
            count = ConnectionFilter.in(connections, loginUser.id).length;
            isImportant = true;
            break;
          case "connection_deny":
            iconName = "user-times";
            iconProvider = "FontAwesome";
            count = ConnectionFilter.deny(connections, loginUser.id).length;
            isImportant = false;
            break;
          default:
            iconName = "cancel";
            iconProvider = "MaterialCommunityIcons";
            count = null;
            isImportant = null;
            break;
        }
        return (
          <TabItemMobileView
            iconName={iconName}
            iconProvider={iconProvider}
            iconSize={BUSINESS_ICON_SIZE}
            iconColor={tintColor}
            iconCount={count}
            iconCountIsImportant={isImportant}
          />
        );
      }
    }),
    tabBarOptions: {
      activeTintColor: "maroon",
      inactiveTintColor: "rgb(214, 174, 139)",
      showLabel: true,
      style: {
        backgroundColor: "antiquewhite"
      }
    }
  }
);
export default ConnectionManagementNavigator;
