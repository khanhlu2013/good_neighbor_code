import React, { Component } from "react";

import { CrudPostDialog } from "./CrudPostDialog";
import keys from "../../configs/keys";
import { PostTable } from "./PostTable";

class PostManagement extends Component {
  state = {
    posts: [],
    refreshingPosts: false,

    //crud post
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
      console.log(posts);
    })();
  };

  createPost = () => {
    this.setState({
      isOpenCrudPostDialog: true,
      curCrudPost: null
    });
  };

  onCrudPost = async (curCrudPost, title, description) => {
    const postID = curCrudPost ? curCrudPost._id : null;

    await fetch(keys.API_URL("profile.crudPost"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ postID, title, description }),
      credentials: "include"
    });
    this.setState({
      isOpenCrudPostDialog: false
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
        <CrudPostDialog
          isOpenCrudPostDialog={this.state.isOpenCrudPostDialog}
          curCrudPost={this.state.curCrudPost}
          onCrudPost={this.onCrudPost}
          onCancelCrudPostDialog={this.onCancelCrudPostDialog}
        />
      </div>
    );
  }
}

export { PostManagement };
