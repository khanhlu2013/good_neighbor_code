import React, { Component } from "react";

import { PostDialog } from "./PostDialog";
import { PostTable } from "./PostTable";
import { API } from "../../api/profile-api";

class PostManagement extends Component {
  state = {
    outPosts: [],
    refreshingPosts: false,

    //crud post
    curCrudOutPostSessionID: null,
    curCrudOutPost: null,
    isOpenPostDialog: false
  };

  componentDidMount() {
    this.refreshPosts();
  }

  refreshPosts = () => {
    this.setState({ refreshingPosts: true });
    (async () => {
      const outPosts = await API.outPosts();
      this.setState({ outPosts, refreshingPosts: false });
    })();
  };

  onOpenOutPostCreateDialog = () => {
    this.setState({
      isOpenPostDialog: true,
      curCrudOutPost: null,
      curCrudOutPostSessionID: Date.now().toString()
    });
  };

  onOpenOutPostEditDialogCb = post => {
    this.setState({
      isOpenPostDialog: true,
      curCrudOutPost: post,
      curCrudOutPostSessionID: Date.now().toString()
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
      curCrudOutPostSessionID: null
    });
    this.refreshPosts();
  };

  onCancelCrudPostDialog = () => {
    this.setState({ isOpenPostDialog: false });
  };

  render() {
    return (
      <div id="PostManagement-react">
        <h1>Posts Management</h1>
        <button onClick={this.onOpenOutPostCreateDialog}>create post</button>
        <PostTable
          outPosts={this.state.outPosts}
          onOpenOutPostEditDialogCb={this.onOpenOutPostEditDialogCb}
        />
        {this.state.curCrudOutPostSessionID && (
          <PostDialog
            key={this.state.curCrudOutPostSessionID}
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

export { PostManagement };
