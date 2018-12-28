import React from "react";
import TabItemMobileView from "../../../share/tabItem.mobileView";
import { PrivateAppRouteToTitleMapper } from "./privateApp.navigation";
import { APP_ICON_SIZE } from "../../../share/uiConstant";

export function createPrivateAppNavigationOption(iconName, iconProvider) {
  return ({ navigation, screenProps }) => {
    const { inPostsAlertCount, outPostsAlertCount } = screenProps;
    const { routeName } = navigation.state;
    let alertCount;
    switch (routeName) {
      case "inPost":
        alertCount = inPostsAlertCount;
        break;

      case "outPost":
        alertCount = outPostsAlertCount;
        break;

      default:
        alertCount = 0;
    }
    return {
      drawerIcon: ({ tintColor }) => (
        <TabItemMobileView
          iconName={iconName}
          iconProvider={iconProvider}
          iconSize={APP_ICON_SIZE}
          iconColor={tintColor}
          iconCount={alertCount}
          iconCountIsImportant={true}
        />
      ),
      title: PrivateAppRouteToTitleMapper(routeName)
    };
  };
}
