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

    //crud
    curCrudPostSessionID: null,
    isOpenCrudDialog: false,
    curCrudPost: null,
    isCrudingPost: false,

    //decision
    isOpenDecisionDialog: false,
    curDecidePost: null
  };

  static calculateRequestingPostCount = posts => {
    if (posts === null) {
      return null;
    }
    return posts.filter(post => post.isRequestingWithNoBorrowing).length;
  };

  static getDerivedStateFromProps(props, state) {
    return {
      requestingPostCount: OutPostManagement.calculateRequestingPostCount(
        state.posts
      )
    };
  }

  componentDidMount() {
    const requestingPostCount = null;
    this.props.requestingOutPostCountChangedCb(requestingPostCount);
    this.doRefreshPosts();
  }

  doRefreshPosts = async () => {
    this.setPostsState(await API.outPosts());
  };

  setPostsState(posts) {
    this.setState({ posts });
    this.props.requestingOutPostCountChangedCb(this.state.requestingPostCount);
  }

  onOpenCrudDialog_create = () => {
    const post = null;
    this.onOpenCrudDialog_edit(post);
  };

  onOpenCrudDialog_edit = post => {
    this.setState({
      isOpenCrudDialog: true,
      curCrudPost: post,
      curCrudPostSessionID: Date.now().toString()
    });
  };

  onCrudDialogOk = (postID, title, description, isActive) => {
    this.setState({
      isCrudingPost: true
    });

    (async () => {
      if (postID) {
        await API.updatePost(postID, title, description, isActive);
      } else {
        await API.createPost(title, description, isActive);
      }
      await this.doRefreshPosts();
      this.setState({ isCrudingPost: false, isOpenCrudDialog: false });
    })();
  };

  onCrudDialogCancel = () => {
    this.setState({ isOpenCrudDialog: false });
  };

  onOpenDecideDialogCb = post => {
    this.setState({
      isOpenDecisionDialog: true,
      curDecidePost: post
    });
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
          onClick={this.onOpenCrudDialog_create}
        >
          new post
        </button>

        {this.state.posts && (
          <OutPostTable
            posts={this.state.posts}
            onEditPost={this.onOpenCrudDialog_edit}
            onOpenDecideDialogCb={this.onOpenDecideDialogCb}
          />
        )}

        {this.state.curCrudPostSessionID && (
          <OutPostCrudDialog
            key={this.state.curCrudPostSessionID}
            isOpen={this.state.isOpenCrudDialog}
            post={this.state.curCrudPost}
            isCrudingPost={this.state.isCrudingPost}
            onOk={this.onCrudDialogOk}
            onCancel={this.onCrudDialogCancel}
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
  requestingOutPostCountChangedCb: PropTypes.func.isRequired
};

export { OutPostManagement };
