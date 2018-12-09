import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import BackDoorLoginView from "./backdoorLogin.view";
import GoogleLoginController from "../../common/app/controller/googleLogin.controller";
import GoogleLoginView from "./googleLogin.view";
import BackdoorLoginControllerConnect from "../../common/app/controller/backdoorLogin.controller";

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
          <GoogleLoginController
            onGoogleLogin={onGoogleLoginMobile}
            view={GoogleLoginView}
          />

          <BackdoorLoginControllerConnect view={BackDoorLoginView} />
        </View>
      )}
      {appContent}
    </View>
  );
}
