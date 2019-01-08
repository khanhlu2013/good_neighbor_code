import React from "react";

import ConnectionManagementNavigator from "../navigation/connectionManagement.navigation";

function ConnectionManagementMobileView(props) {
  const {
    navigation,
    loginUser,
    isFetchingConnections,
    isInitConnections,
    connections,
    updatingConnectionIds,

    onCreateConnection,
    onUpdateConnection,
    isCreatingConnection
  } = props;

  const screenProps = {
    loginUser,
    isFetchingConnections,
    isInitConnections,
    connections,
    updatingConnectionIds,

    onCreateConnection,
    onUpdateConnection,
    isCreatingConnection
  };

  return (
    <ConnectionManagementNavigator
      screenProps={screenProps}
      navigation={navigation}
    />
  );
}

export default ConnectionManagementMobileView;
