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
    curEditPost: null,
    isCrudingPost: false,

    //decision
    isOpenDecisionDialog: false,
    curDecidePost: null,
    isDecidingPost: false
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

  // CRUD START --------------------------------
  onOpenCrudDialog_create = () => {
    const post = null;
    this.onOpenCrudDialog_edit(post);
  };

  onOpenCrudDialog_edit = post => {
    this.setState({
      isOpenCrudDialog: true,
      curEditPost: post,
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

  // CRUD END --------------------------------

  // DECISION START --------------------------
  onOpenDecideDialog = post => {
    this.setState({
      isOpenDecisionDialog: true,
      curDecidePost: post
    });
  };

  onExitDecisionDialog = () => {
    this.setState({
      isOpenDecisionDialog: false,
      curDecidePost: null
    });
  };

  _updateShare = (shareID, isApprove) => {
    this.setState({ isDecidingPost: true });
    (async () => {
      await API.updateOutShare(shareID, isApprove);
      await this.doRefreshPosts();
      const [newDecidePost] = this.state.posts.filter(post =>
        post.shares.some(share => share.id === shareID)
      );
      if (!newDecidePost) {
        throw Error("Cant find curDecidePost");
      }
      this.setState({ curDecidePost: newDecidePost, isDecidingPost: false });
    })();
  };

  onUndoDeniedShare = shareID => {
    this._updateShare(shareID, undefined);
  };

  onUndoApproveShare = shareID => {
    this._updateShare(shareID, undefined);
  };

  onDecideShare = (shareID, isApprove) => {
    if (isApprove === undefined) {
      throw Error("Unexpected decision");
    }

    this._updateShare(shareID, isApprove);
  };
  // DECISION END --------------------------

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
            onDecidePost={this.onOpenDecideDialog}
          />
        )}

        {this.state.curCrudPostSessionID && (
          <OutPostCrudDialog
            key={this.state.curCrudPostSessionID}
            isOpen={this.state.isOpenCrudDialog}
            post={this.state.curEditPost}
            isCrudingPost={this.state.isCrudingPost}
            onOk={this.onCrudDialogOk}
            onCancel={this.onCrudDialogCancel}
          />
        )}

        {this.state.isOpenDecisionDialog && (
          <OutPostDecisionDialog
            isOpen={this.state.isOpenDecisionDialog}
            post={this.state.curDecidePost}
            isDecidingPost={this.state.isDecidingPost}
            onUndoApproveShare={this.onUndoApproveShare}
            onUndoDeniedShare={this.onUndoDeniedShare}
            onDecideShare={this.onDecideShare}
            onExit={this.onExitDecisionDialog}
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
