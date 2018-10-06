import React, { Component } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";

import { OutPostCrudDialog } from "./crudDialog";
import { API } from "../../api/profile-api";
import { OutPostDecisionDialog } from "./decisionDialog";
import { LoadingIcon, computeNotificationCountHtml } from "../../util";
import { Post } from "../../model/post";
import { OutShareHistoryList } from "./outShareHistoryList";
import { OutPostList } from "./outPostList";

class OutPostManagement extends Component {
  state = {
    posts: null,
    awaringReturnPostIds: [],

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

  static getDerivedStateFromProps(props, state) {
    let returnShares = null;
    let requestNotePosts = null;
    let borrowPosts = null;
    let returnNotePosts = null;

    const { posts } = state;

    if (posts) {
      const returnShares2D = posts.map(post =>
        post.shares.filter(share => share.isReturn)
      );
      returnShares = [].concat(...returnShares2D);

      requestNotePosts = posts.filter(post => post.isNote_requestWithNoBorrow);
      borrowPosts = posts.filter(post => post.curBorrowShare);
      returnNotePosts = posts.filter(post => post.unawareReturnShareLatest);
    }
    return {
      returnShares,
      requestNotePosts,
      borrowPosts,
      returnNotePosts
    };
  }

  componentDidMount() {
    this.props.onOutPostNotify(null);
    (async () => {
      this.setPostsState(await API.outPosts());
    })();
  }

  setPostsState(posts) {
    this.setState({ posts });
    const requestPostCount = posts.filter(
      post => post.isNote_requestWithNoBorrow
    ).length;

    this.props.onOutPostNotify(
      requestPostCount + this.state.returnNotePosts.length
    );
  }

  onAwareReturnPost = postId => {
    this.props.onOutPostNotify(null);
    this.setState({
      awaringReturnPostIds: [...this.state.awaringReturnPostIds, postId]
    });

    (async () => {
      await API.awareReturnPost(postId);
      const curPost = this.state.posts.find(post => post.id === postId);
      for (const share of curPost.returnShares) {
        share.isAwareReturn = true;
      }

      this.setPostsState([
        ...this.state.posts.filter(post => post.id !== curPost.id),
        curPost
      ]);
      this.setState({
        awaringReturnPostIds: this.state.awaringReturnPostIds.filter(
          id => id !== postId
        )
      });
    })();
  };

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
          new Date(createdDateCreated),
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

  _approveShare = (shareID, isApprove) => {
    this.setState({ isDecidingPost: true });
    (async () => {
      const decidedIsApprove = await API.approveShare(shareID, isApprove);
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
    this._approveShare(shareID, undefined);
  };

  onUndoApproveShare = shareID => {
    this._approveShare(shareID, undefined);
  };

  onDecideShare = (shareID, isApprove) => {
    if (isApprove === undefined) {
      throw Error("Unexpected decision");
    }

    this._approveShare(shareID, isApprove);
  };
  // DECISION END --------------------------

  _genPostList = (listId, posts) => (
    <OutPostList
      listId={listId}
      posts={posts}
      onEditPost={this.onOpenCrudDialog_edit}
      onDecidePost={this.onOpenDecideDialog}
      onAwareReturnPost={this.onAwareReturnPost}
      awaringReturnPostIds={this.state.awaringReturnPostIds}
    />
  );

  _getPostsContent() {
    const {
      posts,
      requestNotePosts,
      borrowPosts,
      returnNotePosts
    } = this.state;

    return (
      <Tabs forceRenderTabPanel={true}>
        <TabList>
          <button
            id="createPostBtn"
            onClick={this.onOpenCrudDialog_create}
            className="btn btn-sm btn-success mr-4"
          >
            new post
          </button>
          <Tab>
            <span id="tabSelector_outPost_all">
              all {computeNotificationCountHtml(posts.length, false)}
            </span>
          </Tab>
          <Tab>
            <span id="tabSelector_outPost_waitingList">
              request {computeNotificationCountHtml(requestNotePosts.length)}
            </span>
          </Tab>
          <Tab>
            <span id="tabSelector_outPost_borrow">
              borrow {computeNotificationCountHtml(borrowPosts.length, false)}
            </span>
          </Tab>
          <Tab>
            <span id="tabSelector_outPost_returnNote">
              return {computeNotificationCountHtml(returnNotePosts.length)}
            </span>
          </Tab>
          <Tab>
            <span id="tabSelector_outPost_history">
              history{" "}
              {computeNotificationCountHtml(
                this.state.returnShares.length,
                false
              )}
            </span>
          </Tab>
        </TabList>

        <TabPanel>{this._genPostList("outPostList-all-react", posts)}</TabPanel>
        <TabPanel>
          {this._genPostList("outPostList-requestNote-react", requestNotePosts)}
        </TabPanel>
        <TabPanel>
          {this._genPostList("outPostList-borrow-react", borrowPosts)}
        </TabPanel>
        <TabPanel>
          {this._genPostList("outPostList-returnNote-react", returnNotePosts)}
        </TabPanel>
        <TabPanel>
          <OutShareHistoryList shares={this.state.returnShares} />
        </TabPanel>
      </Tabs>
    );
  }

  render() {
    let content;
    if (this.state.posts) {
      content = this._getPostsContent();
    } else {
      content = (
        <h1 className="text-center">
          <LoadingIcon text="loading" />
        </h1>
      );
    }

    return (
      <div id="outPostManagement-react">
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
  onOutPostNotify: PropTypes.func.isRequired
};

export { OutPostManagement };
