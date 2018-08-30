import React, { Component } from "react";

import { OutPostDialog } from "./OutPostDialog";
import { OutPostTable } from "./OutPostTable";
import { API } from "../../api/profile-api";

class OutPostManagement extends Component {
  state = {
    posts: [],
    refreshingPosts: false,

    //crud post
    curCrudPostSessionID: null,
    curCrudOutPost: null,
    isOpenPostDialog: false
  };

  componentDidMount() {
    this.refreshPosts();
  }

  refreshPosts = () => {
    this.setState({ refreshingPosts: true });
    (async () => {
      const posts = await API.outPosts();
      this.setState({ posts, refreshingPosts: false });
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
    this.refreshPosts();
  };

  onCancelCrudPostDialog = () => {
    this.setState({ isOpenPostDialog: false });
  };

  render() {
    return (
      <div id="OutPostManagement-react">
        <h1>Out Posts Management</h1>
        <button id="createPostBtn" onClick={this.onOpenOutPostCreateDialog}>
          create post
        </button>
        <OutPostTable
          posts={this.state.posts}
          onOpenOutPostEditDialogCb={this.onOpenOutPostEditDialogCb}
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
      </div>
    );
  }
}

export { OutPostManagement };
