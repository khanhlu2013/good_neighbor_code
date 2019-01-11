import React from "react";
import { WebBrowser } from "expo";
import { TouchableOpacity, Text } from "react-native";

import GoogleLoginViewPropType from "@gn/common/app/propType/googleLogin.view.propType";

function GoogleLoginMobileView(props) {
  const { onGoogleLogin } = props;
  async function onGoogleLoginx() {
    let redirectUrl = "http://localhost:3001/auth/google/redirect";
    const CLIENT_ID =
      "1070281627663-pcknen1ofn660k7hs9b9sm0ko60jcteg.apps.googleusercontent.com";
    const url =
      `https://accounts.google.com/o/oauth2/v2/auth?response_type=code` +
      `&redirect_uri=${redirectUrl}` +
      `&scope=profile%20email` +
      `&client_id=${CLIENT_ID}`;
    let result = await WebBrowser.openAuthSessionAsync(url, redirectUrl);
    console.log(JSON.stringify(result, null, 4));
  }
  return (
    <TouchableOpacity style={{ alignItems: "center" }} onPress={onGoogleLoginx}>
      <Text style={{ fontSize: 25 }}>Google Login!!</Text>
    </TouchableOpacity>
  );
}
GoogleLoginMobileView.propTypes = GoogleLoginViewPropType;
export default GoogleLoginMobileView;
