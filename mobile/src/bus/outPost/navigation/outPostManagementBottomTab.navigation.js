import React from "react";
import { createBottomTabNavigator } from "react-navigation";

import OutPostListController from "../../../common/bus/outPost/controller/outPostList.controller";
import DUMMY_ID from "../../../share/dummyId";
import OutPostListMobileView from "../view/outPostList.mobileView";

function screenFactory(routeTitle, postListKeyFromScreenProps) {
  return {
    screen: props => {
      const { screenProps } = props;

      const postList = screenProps[postListKeyFromScreenProps];
      return (
        <OutPostListController
          view={OutPostListMobileView}
          listId={DUMMY_ID}
          posts={postList}
          awaringReturnPostIds={screenProps.awaringReturnPostIds}
          onUpdatePostClick={screenProps.onUpdatePostClick}
          onDecidePostClick={screenProps.onDecidePostClick}
          onAwareReturnPostClick={screenProps.onAwareReturnPostClick}
        />
      );
    },
    navigationOptions: {
      title: routeTitle
    }
  };
}

const OutPostManagementBottomTabNavigator = createBottomTabNavigator({
  outPost_all: screenFactory("all", "posts"),
  outPost_request: screenFactory("request", "requestAlertPosts")
});

export default OutPostManagementBottomTabNavigator;
