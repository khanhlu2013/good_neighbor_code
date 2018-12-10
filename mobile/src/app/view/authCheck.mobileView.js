import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

export default function authCheckMobileView() {
  return (
    <View>
      <Text>check auth</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}
