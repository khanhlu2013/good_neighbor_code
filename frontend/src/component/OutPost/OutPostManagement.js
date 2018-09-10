import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import { OutPostCrudDialog } from "./OutPostCrudDialog";
import { OutPostTable } from "./OutPostTable";
import { API } from "../../api/profile-api";
import { OutPostDecisionDialog } from "./OutPostDecisionDialog";

class OutPostManagement extends Component {
  state = {
    posts: null,

    //crud post
    curCrudPostSessionID: null,
    isOpenCrudDialog: false,
    curCrudPost: null,

    isOpenDecisionDialog: false,
    curDecidePost: null
  };

  static calculateRequestingPostCount = posts => {
    if (posts === null) {
      return null;
    }
    return posts.filter(post => post.requesting.length !== 0).length;
  };

  static getDerivedStateFromProps(props, state) {
    return {
      requestingPostCount: OutPostManagement.calculateRequestingPostCount(
        state.posts
      )
    };
  }

  componentDidMount() {
    this.setPostsState(null);
    this.doRefreshPosts();
  }

  setPostsState(posts) {
    this.setState({ posts });
    this.props.onUpdateRequestingPostCountCb(this.state.requestingPostCount);
  }

  doRefreshPosts = async () => {
    this.setPostsState(await API.outPosts());
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

  doCrudPost = async (postID, title, description, isActive) => {
    this.setState({
      isOpenCrudDialog: false,
      curCrudPostSessionID: null
    });
    this.setPostsState(null);
    if (postID) {
      await API.updatePost(postID, title, description, isActive);
    } else {
      await API.createPost(title, description, isActive);
    }
    this.doRefreshPosts();
  };

  doUpdateShare = async (shareID, isApprove) => {
    this.setPostsState(null);
    await API.updateOutShare(shareID, isApprove);
    await this.doRefreshPosts();
    const [newDecidePost] = this.state.posts.filter(post =>
      post.shares.some(share => share.id === shareID)
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

  onUndoApproveRequestingCb = shareID => {
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
      <div
        id="OutPostManagement-react"
        className={classNames({ isRefreshingOutPost: !this.state.posts })}
      >
        <button
          className="btn btn-primary"
          id="createPostBtn"
          onClick={this.onOpenNewCrudDialog}
        >
          new post
        </button>

        {this.state.posts && (
          <OutPostTable
            posts={this.state.posts}
            onOpenCrudDialogCb={this.onOpenCrudDialogCb}
            onOpenDecideDialogCb={this.onOpenDecideDialogCb}
          />
        )}

        {this.state.curCrudPostSessionID && (
          <OutPostCrudDialog
            key={this.state.curCrudPostSessionID}
            isOpen={this.state.isOpenCrudDialog}
            post={this.state.curCrudPost}
            onCrudPostCb={this.doCrudPost}
            onCancelCrudPostDialog={this.onCancelCrudPostDialog}
          />
        )}

        {this.state.isOpenDecisionDialog && (
          <OutPostDecisionDialog
            isOpen={this.state.isOpenDecisionDialog}
            post={this.state.curDecidePost}
            onUndoApproveRequestingCb={this.onUndoApproveRequestingCb}
            onUndoDeniedShareCb={this.onUndoDeniedShareCb}
            onDecideShareCb={this.onDecideShareCb}
            onExitDialogCb={this.onExitPostDecisionDialogCb}
          />
        )}
      </div>
    );
  }
}
OutPostManagement.propType = {
  onUpdateRequestingPostCountCb: PropTypes.func.isRequired
};

export { OutPostManagement };
