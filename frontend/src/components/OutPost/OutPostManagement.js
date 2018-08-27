import React, { Component } from "react";

import { OutPostDialog } from "./OutPostDialog";
import { OutPostTable } from "./OutPostTable";
import { API } from "../../api/profile-api";

class OutPostManagement extends Component {
  state = {
    outPosts: [],
    refreshingPosts: false,

    //crud post
    curCrudOutPostSessionID: null,
    curCrudOutPost: null,
    isOpenOutPostDialog: false
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
      isOpenOutPostDialog: true,
      curCrudOutPost: null,
      curCrudOutPostSessionID: Date.now().toString()
    });
  };

  onOpenOutPostEditDialogCb = post => {
    this.setState({
      isOpenOutPostDialog: true,
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
      isOpenOutPostDialog: false,
      curCrudOutPostSessionID: null
    });
    this.refreshPosts();
  };

  onCancelCrudPostDialog = () => {
    this.setState({ isOpenOutPostDialog: false });
  };

  render() {
    return (
      <div id="OutPostManagement-react">
        <h1>Out Posts Management</h1>
        <button onClick={this.onOpenOutPostCreateDialog}>create post</button>
        <OutPostTable
          outPosts={this.state.outPosts}
          onOpenOutPostEditDialogCb={this.onOpenOutPostEditDialogCb}
        />
        {this.state.curCrudOutPostSessionID && (
          <OutPostDialog
            key={this.state.curCrudOutPostSessionID}
            isOpen={this.state.isOpenOutPostDialog}
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
