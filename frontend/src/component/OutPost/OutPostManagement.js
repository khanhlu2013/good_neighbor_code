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

  doRefreshPosts = async () => {
    this.setState({ isRefreshingPosts: true });
    const posts = await API.outPosts();
    this.setState({ posts, isRefreshingPosts: false });
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
    await this.doRefreshPosts();
  };

  doUpdateShare = async (shareID, isApprove) => {
    this.setState({ isRefreshingPosts: true });
    await API.updateOutShare(shareID, isApprove);
    await this.doRefreshPosts();
    const [newDecidePost] = this.state.posts.filter(
      post => post.shares.filter(share => share.id === shareID).length === 1
    );
    if (!newDecidePost) {
      throw Error("Cant find curDecidePost");
    }
    this.setState({ curDecidePost: newDecidePost });
  };

  onDecideShareCb = async (shareID, isApprove) => {
    if (isApprove === undefined) {
      throw Error("Unexpected decision");
    }
    this.doUpdateShare(shareID, isApprove);
  };

  onCancelCrudPostDialog = () => {
    this.setState({ isOpenCrudDialog: false });
  };

  onUndoBorrowingCb = shareID => {
    this.doUpdateShare(shareID, undefined);
  };

  onUndoDeniedShareCb = shareID => {
    this.doUpdateShare(shareID, undefined);
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
            onDecideShareCb={this.onDecideShareCb}
            onExitDialogCb={this.onExitPostDecisionDialogCb}
          />
        )}
        {this.state.isRefreshingPosts && <p>refreshing out posts ...</p>}
      </div>
    );
  }
}

export { OutPostManagement };
