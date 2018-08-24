import React, { Component } from "react";

import { CrudPostDialog } from "./CrudPostDialog";
import keys from "../../configs/keys";
import { PostTable } from "./PostTable";

class PostManagement extends Component {
  state = {
    posts: [],
    refreshingPosts: false,

    //crud post
    curCrudPostSessionID: null,
    curCrudPost: null,
    isOpenCrudPostDialog: false
  };

  componentDidMount() {
    this.refreshPosts();
  }

  refreshPosts = () => {
    this.setState({ refreshingPosts: true });
    (async () => {
      const response = await fetch(keys.API_URL("profile.posts"), {
        credentials: "include"
      });
      const posts = await response.json();
      this.setState({ posts, refreshingPosts: false });
    })();
  };

  createPost = () => {
    this.setState({
      isOpenCrudPostDialog: true,
      curCrudPost: null,
      curCrudPostSessionID: Date.now().toString()
    });
  };

  onCrudPost = async (postID, title, description) => {
    await fetch(keys.API_URL("profile.crudPost"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ postID, title, description }),
      credentials: "include"
    });
    this.setState({
      isOpenCrudPostDialog: false,
      curCrudPostSessionID: null
    });
    this.refreshPosts();
  };

  onCancelCrudPostDialog = () => {
    this.setState({ isOpenCrudPostDialog: false });
  };

  render() {
    return (
      <div id="PostManagement-react">
        <button onClick={this.createPost}>create post</button>
        <PostTable posts={this.state.posts} />
        {this.state.curCrudPostSessionID && (
          <CrudPostDialog
            key={this.state.curCrudPostSessionID}
            isOpen={this.state.isOpenCrudPostDialog}
            post={this.state.curCrudPost}
            onCrudPost={this.onCrudPost}
            onCancelCrudPostDialog={this.onCancelCrudPostDialog}
          />
        )}
      </div>
    );
  }
}

export { PostManagement };
