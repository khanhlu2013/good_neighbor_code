import React from "react";

import ConnectionManagementNavigator from "../navigation/connectionManagement.navigation";

function ConnectionManagementMobileView(props) {
  const { navigation } = props;
  const screenProps = {
    loginUser: props.loginUser,
    isFetchingConnections: props.isFetchingConnections,
    isInitConnections: props.isInitConnections,
    connections: props.connections,
    updatingConnectionIds: props.updatingConnectionIds,
    onCreateConnection: props.onCreateConnection,
    onUpdateConnection: props.onUpdateConnection
  };

  return (
    <ConnectionManagementNavigator
      screenProps={screenProps}
      navigation={navigation}
    />
  );
}

export default ConnectionManagementMobileView;
