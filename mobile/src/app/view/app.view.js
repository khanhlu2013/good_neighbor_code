import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import BackdoorLoginConnect from "../connect/backdoorLogin.connect";
import BackDoorLoginView from "./backdoorLogin.view";

export default function AppView(loginUser, isCheckedAuth) {
  let appContent;
  if (!isCheckedAuth) {
    appContent = <Text>auth is not check yet ...</Text>;
  } else if (loginUser === null) {
    appContent = <Text>User is logged out. Public content here ........</Text>;
  } else {
    appContent = <Text>User is logged in. private content here ...</Text>;
  }

  return (
    <View id="app-react">
      {loginUser === null && (
        <View>
          <TouchableOpacity>
            <Text>Google Login</Text>
          </TouchableOpacity>
          <BackdoorLoginConnect view={BackDoorLoginView} />
        </View>
      )}
      {appContent}
    </View>
  );
}
