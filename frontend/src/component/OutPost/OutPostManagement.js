import React, { Component } from "react";

import { OutPostDialog } from "./OutPostDialog";
import { OutPostTable } from "./OutPostTable";
import { API } from "../../api/profile-api";
import { OutShareRequestingTable } from "./OutShareRequestingTable";

class OutPostManagement extends Component {
  state = {
    outPosts: [],
    isRefreshingOutPosts: false,

    //crud post
    curCrudPostSessionID: null,
    curCrudOutPost: null,
    isOpenPostDialog: false
  };

  componentDidMount() {
    this.doRefreshOutPosts();
  }

  doRefreshOutPosts = () => {
    this.setState({ isRefreshingOutPosts: true });
    (async () => {
      const outPosts = await API.outPosts();
      this.setState({ outPosts, isRefreshingOutPosts: false });
    })();
  };

  onOpenOutPostCreateDialog = () => {
    this.setState({
      isOpenPostDialog: true,
      curCrudOutPost: null,
      curCrudPostSessionID: Date.now().toString()
    });
  };

  onOpenOutPostEditDialogCb = post => {
    this.setState({
      isOpenPostDialog: true,
      curCrudOutPost: post,
      curCrudPostSessionID: Date.now().toString()
    });
  };

  onCrudOutPostCb = async (postID, title, description, isActive) => {
    if (postID) {
      await API.updatePost(postID, title, description, isActive);
    } else {
      await API.createPost(title, description, isActive);
    }
    this.setState({
      isOpenPostDialog: false,
      curCrudPostSessionID: null
    });
    this.doRefreshOutPosts();
  };

  onDecideOutShareRequestingCb = async (shareID, isApprove) => {
    this.setState({ isRefreshingOutPosts: true });
    await API.decideOutShareRequesting(shareID, isApprove);
    this.doRefreshOutPosts();
  };

  onCancelCrudPostDialog = () => {
    this.setState({ isOpenPostDialog: false });
  };

  render() {
    const outShareRequesting2D = this.state.outPosts.map(outPost => {
      return outPost.shares.filter(share => share.isRequesting);
    });
    const outShareRequesting = [].concat(...outShareRequesting2D);

    return (
      <div id="OutPostManagement-react">
        <h1>Out Posts Management</h1>
        <button id="createPostBtn" onClick={this.onOpenOutPostCreateDialog}>
          create post
        </button>
        <OutPostTable
          outPosts={this.state.outPosts}
          onOpenOutPostEditDialogCb={this.onOpenOutPostEditDialogCb}
        />
        <OutShareRequestingTable
          shares={outShareRequesting}
          onDecideOutShareRequestingCb={this.onDecideOutShareRequestingCb}
        />

        {this.state.curCrudPostSessionID && (
          <OutPostDialog
            key={this.state.curCrudPostSessionID}
            isOpen={this.state.isOpenPostDialog}
            outPost={this.state.curCrudOutPost}
            onCrudOutPostCb={this.onCrudOutPostCb}
            onCancelCrudPostDialog={this.onCancelCrudPostDialog}
          />
        )}
        {this.state.isRefreshingOutPosts && <p>refreshing out posts ...</p>}
      </div>
    );
  }
}

export { OutPostManagement };
