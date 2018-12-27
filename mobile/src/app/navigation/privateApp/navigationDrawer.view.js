import React from "react";
import { DrawerItems } from "react-navigation";
import { Text, SafeAreaView, ScrollView, View } from "react-native";

const PrivateAppNavigationDrawerView = props => (
  <SafeAreaView style={{ flex: 1 }}>
    <View
      style={{
        height: 150,
        backgroundColor: "lime",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Text style={{ fontSize: 20 }}>Good Neighbor</Text>
    </View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
);

export default PrivateAppNavigationDrawerView;
