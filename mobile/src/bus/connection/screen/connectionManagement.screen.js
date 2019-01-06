import React from "react";
import { Text } from "native-base";

function ConnectionManagementScreen(props) {
  return (
    <Text>`connection alert : ${props.screenProps.connectionAlertCount}`</Text>
  );
}

export default ConnectionManagementScreen;
