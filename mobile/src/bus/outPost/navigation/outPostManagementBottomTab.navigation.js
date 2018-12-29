import React from "react";
import { createBottomTabNavigator } from "react-navigation";

import OutPostListMobileView from "../outPostList.mobileView";
import OutPostListController from "../../../common/bus/outPost/controller/outPostList.controller";
import DUMMY_ID from "../../../share/dummyId";

const OutPostManagementBottomTabNavigator = createBottomTabNavigator({
  outPost_all: {
    screen: props => {
      const { screenProps } = props;
      const { posts } = screenProps;
      return (
        <OutPostListController
          view={OutPostListMobileView}
          listId={DUMMY_ID}
          posts={posts}
        />
      );
    },
    navigationOptions: {
      title: "all"
    }
  },
  outPost_request: {
    screen: props => {
      const { screenProps } = props;
      const { requestAlertPosts } = screenProps;
      return (
        <OutPostListController
          view={OutPostListMobileView}
          listId={DUMMY_ID}
          posts={requestAlertPosts}
        />
      );
    },
    navigationOptions: {
      title: "request"
    }
  }
});

export default OutPostManagementBottomTabNavigator;
