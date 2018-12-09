import React from "react";
import { View, Text } from "react-native";
import BackDoorLoginView from "./backdoorLogin.view";
import GoogleLoginRPC from "../../common/app/controller/googleLogin.controller";
import GoogleLoginView from "./googleLogin.view";
import BackdoorLoginConnect from "../../common/app/connect/backdoorLogin.connect";

function onGoogleLoginMobile() {
  alert("under construction");
}

export default function AppView(loginUser, isCheckedAuth) {
  let appContent;
  const publicContent = null;

  if (!isCheckedAuth) {
    appContent = <Text>auth is not check yet ...</Text>;
  } else if (loginUser === null) {
    appContent = publicContent;
  } else {
    appContent = <Text>User is logged in. private content here ..</Text>;
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
