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

  createPost = () => {
    this.setState({
      isOpenOutPostDialog: true,
      curCrudOutPost: null,
      curCrudOutPostSessionID: Date.now().toString()
    });
  };

  onCrudOutPostCb = async (postID, title, description) => {
    if (postID) {
      await API.updatePost(postID, title, description);
    } else {
      await API.createPost(title, description);
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
        <button onClick={this.createPost}>create post</button>
        <OutPostTable outPosts={this.state.outPosts} />
        {this.state.curCrudOutPostSessionID && (
          <OutPostDialog
            key={this.state.curCrudOutPostSessionID}
            isOpen={this.state.isOpenOutPostDialog}
            post={this.state.curCrudOutPost}
            onCrudOutPostCb={this.onCrudOutPostCb}
            onCancelCrudPostDialog={this.onCancelCrudPostDialog}
          />
        )}
      </div>
    );
  }
}

export { OutPostManagement };
