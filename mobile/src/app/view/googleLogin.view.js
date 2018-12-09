import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default function GoogleLoginView(onGoogleLogin) {
  return (
    <TouchableOpacity style={{ alignItems: "center" }} onPress={onGoogleLogin}>
      <Text style={{ fontSize: 25 }}>Google Login</Text>
    </TouchableOpacity>
  );
}
