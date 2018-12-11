import React from "react";
import { View, StyleSheet } from "react-native";

import AuthCheckController from "../controller/authCheck.controller";
import authCheckMobileView from "../view/authCheck.mobileView";

export default function AuthCheckScreen(props) {
  return (
    <View style={styles.container}>
      <AuthCheckController view={authCheckMobileView} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
