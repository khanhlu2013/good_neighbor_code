import React, { Component } from "react";
import OutPostManagementNavigator from "../navigation/outPostManagement.navigation";

class OutPostManagementMobileView extends Component {
  state = {
    curDecidePostId: null
  };
  getPostById = postId => this.props.posts.find(post => post.id === postId);

  onUpdatePostClick = postId => {
    this.props.navigation.navigate("outPost_crudDialog", {
      post: this.getPostById(postId)
    });
  };

  onDecidePostClick = postId => {
    this.setState({ curDecidePostId: postId }, () =>
      this.props.navigation.navigate("outPost_decisionDialog")
    );
  };
  render() {
    const {
      navigation,

      //data
      posts,
      awaringReturnPostIds,

      //derived data
      requestAlertPosts,

      //handler
      onAwareReturnPostClick,
      onCreateOrUpdatePost,
      onUndoApproveShare,
      onUndoDenyShare,
      onDecideShare
    } = this.props;

    const screenProps = {
      posts,
      requestAlertPosts,
      awaringReturnPostIds,
      onUpdatePostClick: this.onUpdatePostClick,
      onDecidePostClick: this.onDecidePostClick,

      onAwareReturnPostClick,
      onCreateOrUpdatePost,
      onUndoApproveShare,
      onUndoDenyShare,
      onDecideShare,

      //non-redux-state
      curDecidePost: this.getPostById(this.state.curDecidePostId)
    };
    return (
      <OutPostManagementNavigator
        screenProps={screenProps}
        navigation={navigation}
      />
    );
  }
}

export default OutPostManagementMobileView;
