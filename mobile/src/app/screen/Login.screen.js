import React from "react";
import { StyleSheet, View } from "react-native";

import BackdoorLoginController from "@gn/common/app/controller/backdoorLogin.controller";
import GoogleLoginController from "@gn/common/app/controller/googleLogin.controller";
import BackDoorLoginMobileView from "../view/backdoorLogin.mobileView";
import GoogleLoginMobileView from "../view/googleLogin.mobileView";

function onGoogleLoginMobile() {
  alert("under construction");
}

export default function LoginScreen(props) {
  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 100 }}>
        <GoogleLoginController
          onGoogleLogin={onGoogleLoginMobile}
          view={GoogleLoginMobileView}
        />
      </View>

      <View>
        <BackdoorLoginController view={BackDoorLoginMobileView} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  }
});
