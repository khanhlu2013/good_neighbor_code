import React from "react";
import { View } from "react-native";

import BackdoorLoginController from "../../common/app/controller/backdoorLogin.controller";
import BackDoorLoginView from "../view/backdoorLogin.view";
import GoogleLoginController from "../../common/app/controller/googleLogin.controller";
import GoogleLoginView from "../view/googleLogin.view";

function onGoogleLoginMobile() {
  alert("under construction");
}

export default function LoginScreen(props) {
  return (
    <View>
      <View style={{ marginBottom: 100 }}>
        <GoogleLoginController
          onGoogleLogin={onGoogleLoginMobile}
          view={GoogleLoginView}
        />
      </View>

      <BackdoorLoginController view={BackDoorLoginView} />
    </View>
  );
}
