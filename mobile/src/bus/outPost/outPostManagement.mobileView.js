import React, { Component } from "react";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import { View, Text } from "react-native";
import OutPostManagementPropType from "../../common/bus/outPost/propType/outPostManagement.propType";
import OutPostListController from "../../common/bus/outPost/controller/outPostList.controller";
import OutPostListMobileView from "./outPostList.mobileView";

class OutPostManagementMobileView extends Component {
  static propTypes = OutPostManagementPropType;

  state = {
    //crud
    postIdForDialogToCreateOrUpdate: null,
    isCrudingPost: false,

    //decide
    curDecidePostId: null
  };

  onOpenUpdatePostDialog = postId => {
    console.log("open update post dialog ", postId);
  };
  onOpenDecidePostDialog = postId => {
    console.log("open decide post dialog ", postId);
  };

  render() {
    const {
      //data
      posts,
      isInitPosts,
      isFetchingPosts,

      //derived data
      requestAlertPosts,
      borrowPosts,
      returnAlertPosts,
      returnShares,

      //crud post
      onCreateOrUpdatePost,

      //decide post
      onDecideShare,
      onUndoDenyShare,
      onUndoApproveShare,

      //aware return post
      onAwareReturnPost,
      awaringReturnPostIds
    } = this.props;

    const nav = createBottomTabNavigator({
      all: {
        screen: props => (
          <OutPostListController
            posts={posts}
            view={OutPostListMobileView}
            awaringReturnPostIds={awaringReturnPostIds}
            onOpenUpdatePostDialog={this.onOpenUpdatePostDialog}
            onOpenDecidePostDialog={this.onOpenDecidePostDialog}
            onAwareReturnPostClick={onAwareReturnPost}
          />
        ),
        navigationOptions: {
          title: "all"
        }
      },
      request: {
        screen: props => (
          <OutPostListController
            posts={requestAlertPosts}
            view={OutPostListMobileView}
          />
        ),
        navigationOptions: {
          title: "request"
        }
      }
    });
    return React.createElement(createAppContainer(nav));
  }
}

export default OutPostManagementMobileView;
