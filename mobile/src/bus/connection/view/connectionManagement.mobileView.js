import React from "react";

import ConnectionManagementNavigator from "../navigation/connectionManagement.navigation";

function ConnectionManagementMobileView(props) {
  const { navigation } = props;

  return <ConnectionManagementNavigator navigation={navigation} />;
}

export default ConnectionManagementMobileView;
