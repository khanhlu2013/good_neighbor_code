import React, { Component } from "react";
import OutPostManagementNavigator from "../navigation/outPostManagement.navigation";

class OutPostManagementMobileView extends Component {
  getPostById = postId => this.props.posts.find(post => post.id === postId);

  onUpdatePostClick = postId => {
    this.props.navigation.navigate("outPost_crudDialog", {
      post: this.getPostById(postId)
    });
  };

  onDecidePostClick = postId => {
    this.props.navigation.navigate("outPost_decisionDialog", {
      post: this.getPostById(postId)
    });
  };

  render() {
    const {
      navigation,
      posts,
      requestAlertPosts,
      awaringReturnPostIds,
      onAwareReturnPostClick,
      onCreateOrUpdatePost
    } = this.props;
    const screenProps = {
      posts,
      requestAlertPosts,
      awaringReturnPostIds,
      onUpdatePostClick: this.onUpdatePostClick,
      onDecidePostClick: this.onDecidePostClick,
      onAwareReturnPostClick,
      onCreateOrUpdatePost
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
