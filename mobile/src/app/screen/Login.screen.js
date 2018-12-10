import React from "react";
import { View } from "react-native";

import BackdoorLoginController from "../../common/app/controller/backdoorLogin.controller";
import GoogleLoginController from "../../common/app/controller/googleLogin.controller";
import BackDoorLoginMobileView from "../view/backdoorLogin.mobileView";
import GoogleLoginMobileView from "../view/googleLogin.mobileView";

function onGoogleLoginMobile() {
  alert("under construction");
}

export default function LoginScreen(props) {
  return (
    <View>
      <View style={{ marginBottom: 100 }}>
        <GoogleLoginController
          onGoogleLogin={onGoogleLoginMobile}
          view={GoogleLoginMobileView}
        />
      </View>

      <BackdoorLoginController view={BackDoorLoginMobileView} />
    </View>
  );
}
