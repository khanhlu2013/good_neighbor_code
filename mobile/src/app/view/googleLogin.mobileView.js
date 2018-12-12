import React from "react";
import { TouchableOpacity, Text } from "react-native";
import PropTypes from "prop-types";
import GoogleLoginViewPropTypes from "../../common/app/propTypes/googleLoginView.propTypes";

function GoogleLoginMobileView(props) {
  const { onGoogleLogin } = props;
  return (
    <TouchableOpacity style={{ alignItems: "center" }} onPress={onGoogleLogin}>
      <Text style={{ fontSize: 25 }}>Google Login</Text>
    </TouchableOpacity>
  );
}
GoogleLoginMobileView.propTypes = GoogleLoginViewPropTypes;
export default GoogleLoginMobileView;
