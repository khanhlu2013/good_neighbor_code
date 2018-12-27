import React from "react";

import PrivateAppMobileController from "../controller/privateApp.mobileController";
import PrivateAppNavigator from "../navigation/privateApp.navigation";
import PrivateAppMobileView from "../view/privateApp.mobileView";

function PrivateAppScreen(props) {
  const { navigation } = props;
  return (
    <PrivateAppMobileController
      navigation={navigation}
      view={PrivateAppMobileView}
    />
  );
}
PrivateAppScreen.router = PrivateAppNavigator.router;
export default PrivateAppScreen;
