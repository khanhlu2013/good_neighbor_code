import React from "react";
import { TouchableOpacity, Text } from "react-native";
import PropTypes from "prop-types";
import GoogleLoginViewPropType from "../../common/app/propTypes/googleLogin.view.propType";

function GoogleLoginMobileView(props) {
  const { onGoogleLogin } = props;
  return (
    <TouchableOpacity style={{ alignItems: "center" }} onPress={onGoogleLogin}>
      <Text style={{ fontSize: 25 }}>Google Login</Text>
    </TouchableOpacity>
  );
}
GoogleLoginMobileView.propTypes = GoogleLoginViewPropType;
export default GoogleLoginMobileView;
