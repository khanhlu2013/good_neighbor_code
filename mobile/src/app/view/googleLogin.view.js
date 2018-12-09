import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default function GoogleLoginView(onGoogleLogin) {
  return (
    <TouchableOpacity
      style={{ alignItems: "center", marginBottom: 50 }}
      onPress={onGoogleLogin}
    >
      <Text style={{ fontSize: 40 }}>Google Login</Text>
    </TouchableOpacity>
  );
}
