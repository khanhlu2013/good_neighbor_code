import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

export default function authCheckMobileView(props) {
  return (
    <View>
      <Text>checking auth</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}
