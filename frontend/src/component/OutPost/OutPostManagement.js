import React, { Component } from "react";
import PropTypes from "prop-types";

import { OutPostCrudDialog } from "./OutPostCrudDialog";
import { OutPostTable } from "./OutPostTable";
import { API } from "../../api/profile-api";
import { OutPostDecisionDialog } from "./OutPostDecisionDialog";
import { LoadingIcon } from "../../util";
import { Post } from "../../model/post";
import { OutShareReturnTable } from "./OutShareReturnTable";

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

  static countRequestPost = posts => {
    if (posts === null) {
      return null;
    }
    return posts.filter(post => post.isRequestWithNoBorrow).length;
  };

  static getDerivedStateFromProps(props, state) {
    let returnShares = null;
    if (state.posts) {
      const returnShares2D = state.posts.map(post =>
        post.shares.filter(share => share.isReturn)
      );
      returnShares = [].concat(...returnShares2D);
    }
    return { returnShares };
  }

  componentDidMount() {
    const requestPostCount = null;
    this.props.onOutPostRequestCountChange(requestPostCount);
    (async () => {
      this.setPostsState(await API.outPosts());
    })();
  }

  setPostsState(posts) {
    this.setState({ posts });
    const requestPostCount = OutPostManagement.countRequestPost(posts);

    this.props.onOutPostRequestCountChange(requestPostCount);
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
        const {
          updatedTitle,
          updatedDescription,
          updatedIsActive
        } = await API.updatePost(postID, title, description, isActive);
        const [oldPost] = this.state.posts.filter(post => post.id === postID);
        oldPost.title = updatedTitle;
        oldPost.description = updatedDescription;
        oldPost.isActive = updatedIsActive;
        this.setState({
          posts: [
            ...this.state.posts.filter(post => post.id !== postID),
            oldPost
          ]
        });
      } else {
        const {
          createdId,
          createdIsActive,
          createdTitle,
          createdDescription,
          createdDateCreated
        } = await API.createPost(title, description, isActive);
        const newPost = new Post(
          createdId,
          this.props.loginUser,
          createdIsActive,
          createdTitle,
          createdDescription,
          createdDateCreated,
          []
        );
        this.setState({ posts: [...this.state.posts, newPost] });
      }
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
      const decidedIsApprove = await API.updateOutShare(shareID, isApprove);
      const [decidedPost] = this.state.posts.filter(post =>
        post.shares.some(share => share.id === shareID)
      );
      const [decidedShare] = decidedPost.shares.filter(
        share => share.id === shareID
      );
      decidedShare.isApprove = decidedIsApprove;
      decidedPost.shares = [
        ...decidedPost.shares.filter(share => share.id !== shareID),
        decidedShare
      ];
      this.setPostsState([
        ...this.state.posts.filter(post => post.id !== decidedPost.id),
        decidedPost
      ]);
      this.setState({ curDecidePost: decidedPost, isDecidingPost: false });
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
    const { posts } = this.state;
    let content;
    if (posts) {
      content = (
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <OutPostTable
                posts={this.state.posts}
                onEditPost={this.onOpenCrudDialog_edit}
                onDecidePost={this.onOpenDecideDialog}
              />
            </div>
            <div className="col-sm">
              <OutShareReturnTable
                shares={this.state.returnShares}
                deletingShareIds={this.state.deletingShareIds}
                onDeleteShare={this.onDeleteShare}
              />
            </div>
          </div>
        </div>
      );
    } else {
      content = (
        <h1 className="text-center">
          <LoadingIcon text="loading" isAnimate={true} />
        </h1>
      );
    }

    return (
      <div id="OutPostManagement-react">
        <button
          className="btn btn-primary"
          id="createPostBtn"
          onClick={this.onOpenCrudDialog_create}
        >
          new post
        </button>

        {content}

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
  loginUser: PropTypes.object.isRequired,
  onOutPostRequestCountChange: PropTypes.func.isRequired
};

export { OutPostManagement };
