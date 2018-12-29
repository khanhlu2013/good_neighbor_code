import React from "react";
import PropTypes from "prop-types";
import { createBottomTabNavigator } from "react-navigation";

import OutPostListMobileView from "../outPostList.mobileView";
import Post from "../../../common/model/post";
import OutPostListController from "../../../common/bus/outPost/controller/outPostList.controller";
import DUMMY_ID from "../../../share/dummyId";

const OutPostManagementNavigator = createBottomTabNavigator({
  outPost_all: {
    screen: props => {
      const { screenProps } = props;
      const {
        posts,
        awaringReturnPostIds,
        onOpenUpdatePostDialog,
        onOpenDecidePostDialog,
        onDecideShare
      } = screenProps;
      return (
        <OutPostListController
          view={OutPostListMobileView}
          listId={DUMMY_ID}
          posts={posts}
          // onOpenUpdatePostDialog={onOpenUpdatePostDialog}
          // onOpenDecidePostDialog={onOpenDecidePostDialog}
          // onAwareReturnPostClick={onDecideShare}
          // awaringReturnPostIds={awaringReturnPostIds}
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
      const {
        requestAlertPosts,
        awaringReturnPostIds,
        onOpenUpdatePostDialog,
        onOpenDecidePostDialog,
        onAwareReturnPostClick
      } = screenProps;
      return (
        <OutPostListController
          view={OutPostListMobileView}
          listId={DUMMY_ID}
          posts={requestAlertPosts}
          // awaringReturnPostIds={awaringReturnPostIds}
          // onOpenUpdatePostDialog={onOpenUpdatePostDialog}
          // onOpenDecidePostDialog={onOpenDecidePostDialog}
          // onAwareReturnPostClick={onAwareReturnPostClick}
        />
      );
    },
    navigationOptions: {
      title: "request"
    }
  }
});
// OutPostManagementNavigator.propTypes = {
//   screenProps: PropTypes.shape({
//     posts: PropTypes.arrayOf(Post).isRequired,
//     requestAlertPosts: PropTypes.arrayOf(Post).isRequired,
//     awaringReturnPostIds: PropTypes.arrayOf(PropTypes.string).isRequired,
//     onOpenUpdatePostDialog: PropTypes.func.isRequired,
//     onOpenDecidePostDialog: PropTypes.func.isRequired,
//     onAwareReturnPostClick: PropTypes.func.isRequired
//   }).isRequired,
//   navigation: PropTypes.object.isRequired
// };

export default OutPostManagementNavigator;
