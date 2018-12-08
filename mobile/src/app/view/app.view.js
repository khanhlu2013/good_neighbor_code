import React from "react";
import { View, Text } from "react-native";
import BackdoorLoginConnect from "../connect/backdoorLogin.connect";
import BackDoorLoginView from "./backdoorLogin.view";
import GoogleLoginRPC from "../../common/app/rpc/googleLogin.rpc";
import GoogleLoginView from "./googleLogin.view";

function onGoogleLoginMobile() {}

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
          <GoogleLoginRPC
            onGoogleLogin={onGoogleLoginMobile}
            view={GoogleLoginView}
          />

          <BackdoorLoginConnect view={BackDoorLoginView} />
        </View>
      )}
      {appContent}
    </View>
  );
}
