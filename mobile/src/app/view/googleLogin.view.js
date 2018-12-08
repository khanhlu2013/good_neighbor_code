import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default function GoogleLoginView(onGoogleLogin) {
  return (
    <TouchableOpacity onPress={onGoogleLogin}>
      <Text>Google Login</Text>
    </TouchableOpacity>
  );
}
