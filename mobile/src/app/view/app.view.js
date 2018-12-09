import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import BackDoorLoginView from "./backdoorLogin.view";
import GoogleLoginRPC from "../../common/app/controller/googleLogin.controller";
import GoogleLoginView from "./googleLogin.view";
import BackdoorLoginConnect from "../../common/app/connect/backdoorLogin.connect";

function onGoogleLoginMobile() {
  alert("under construction");
}

export default function AppView(loginUser, isCheckingAuth, isCheckedAuth) {
  let appContent;
  const publicContent = null;

  if (isCheckingAuth) {
    appContent = <ActivityIndicator size="large" />;
  } else if (loginUser === null) {
    appContent = publicContent;
  } else {
    appContent = <Text>User is logged in. private content here ..</Text>;
  }

  return (
    <View id="app-react">
      {loginUser === null && isCheckedAuth && (
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
