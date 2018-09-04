import React, { Component } from "react";

import { OutPostCrudDialog } from "./OutPostCrudDialog";
import { OutPostTable } from "./OutPostTable";
import { API } from "../../api/profile-api";
import { OutPostDecisionDialog } from "./OutPostDecisionDialog";

class OutPostManagement extends Component {
  state = {
    posts: [],
    isRefreshingPosts: false,

    //crud post
    curCrudPostSessionID: null,
    isOpenCrudDialog: false,
    curCrudPost: null,

    isOpenDecisionDialog: false,
    curDecidePost: null
  };

  componentDidMount() {
    this.doRefreshPosts();
  }

  doRefreshPosts = () => {
    this.setState({ isRefreshingPosts: true });
    (async () => {
      const posts = await API.outPosts();
      this.setState({ posts, isRefreshingPosts: false });
    })();
  };

  onOpenNewCrudDialog = () => {
    this.setState({
      isOpenCrudDialog: true,
      curCrudPost: null,
      curCrudPostSessionID: Date.now().toString()
    });
  };

  onOpenCrudDialogCb = post => {
    this.setState({
      isOpenCrudDialog: true,
      curCrudPost: post,
      curCrudPostSessionID: Date.now().toString()
    });
  };

  onOpenDecideDialogCb = post => {
    this.setState({
      isOpenDecisionDialog: true,
      curDecidePost: post
    });
  };

  onCrudPostCb = async (postID, title, description, isActive) => {
    if (postID) {
      await API.updatePost(postID, title, description, isActive);
    } else {
      await API.createPost(title, description, isActive);
    }
    this.setState({
      isOpenCrudDialog: false,
      curCrudPostSessionID: null
    });
    this.doRefreshPosts();
  };

  onDecideOutShareRequestingCb = async (shareID, isApprove) => {
    this.setState({ isRefreshingPosts: true });
    await API.decideOutShareRequesting(shareID, isApprove);
    this.doRefreshPosts();
  };

  onCancelCrudPostDialog = () => {
    this.setState({ isOpenCrudDialog: false });
  };

  onUndoBorrowingCb = shareID => {
    console.log("undo borrowing", shareID);
  };

  onUndoDeniedShareCb = shareID => {
    console.log("undo denied share", shareID);
  };

  onDecideRequestingShareCb = (shareID, isApprove) => {
    console.log("decide requesting share", isApprove, shareID);
  };

  onExitPostDecisionDialogCb = () => {
    this.setState({
      isOpenDecisionDialog: false,
      curDecidePost: null
    });
  };

  render() {
    return (
      <div id="OutPostManagement-react">
        <h1>Out Posts Management</h1>
        <button id="createPostBtn" onClick={this.onOpenNewCrudDialog}>
          create post
        </button>
        <OutPostTable
          posts={this.state.posts}
          onOpenCrudDialogCb={this.onOpenCrudDialogCb}
          onOpenDecideDialogCb={this.onOpenDecideDialogCb}
        />

        {this.state.curCrudPostSessionID && (
          <OutPostCrudDialog
            key={this.state.curCrudPostSessionID}
            isOpen={this.state.isOpenCrudDialog}
            post={this.state.curCrudPost}
            onCrudPostCb={this.onCrudPostCb}
            onCancelCrudPostDialog={this.onCancelCrudPostDialog}
          />
        )}

        {this.state.isOpenDecisionDialog && (
          <OutPostDecisionDialog
            isOpen={this.state.isOpenDecisionDialog}
            post={this.state.curDecidePost}
            onUndoBorrowingCb={this.onUndoBorrowingCb}
            onUndoDeniedShareCb={this.onUndoDeniedShareCb}
            onDecideRequestingShareCb={this.onDecideRequestingShareCb}
            onExitDialogCb={this.onExitPostDecisionDialogCb}
          />
        )}
        {this.state.isRefreshingPosts && <p>refreshing out posts ...</p>}
      </div>
    );
  }
}

export { OutPostManagement };
