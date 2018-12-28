import React, { Component } from "react";
import OutPostManagementPropType from "../../common/bus/outPost/propType/outPostManagement.propType";
import OutPostManagementNavigator from "./navigation/outPostManagement.navigation";

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
      awaringReturnPostIds,

      //derived data
      requestAlertPosts,
      borrowPosts,
      returnAlertPosts,
      returnShares,

      //handler - crud post
      onCreateOrUpdatePost,

      //handler - decide post
      onDecideShare,
      onUndoDenyShare,
      onUndoApproveShare,

      //handler - aware return post
      onAwareReturnPost
    } = this.props;

    return (
      <OutPostManagementNavigator
        navigation={this.props.navigation}
        screenProps={{
          //data
          posts,
          isInitPosts,
          isFetchingPosts,
          awaringReturnPostIds,

          //derivedData
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

          //handler - aware return post
          onAwareReturnPost
        }}
      />
    );
  }
}

export default OutPostManagementMobileView;
