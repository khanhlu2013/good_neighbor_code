import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import { Text } from "native-base";

function ConnectionFriendScreen() {
  return <Text>connection friend screen</Text>;
}
function ConnectionOutScreen() {
  return <Text>connection out screen</Text>;
}
function ConnectionInScreen() {
  return <Text>connection in screen</Text>;
}

const ConnectionManagementNavigator = createBottomTabNavigator({
  connection_friend: {
    screen: ConnectionFriendScreen,
    navigationOptions: { title: "all friends" }
  },
  connection_out: {
    screen: ConnectionOutScreen,
    navigationOptions: { title: "my request" }
  },
  connection_in: {
    screen: ConnectionInScreen,
    navigationOptions: { title: "friend request" }
  }
});
export default ConnectionManagementNavigator;
