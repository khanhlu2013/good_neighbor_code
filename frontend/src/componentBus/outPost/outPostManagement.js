import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import { OutPostCrudDialog } from "./crudDialog";
import { API } from "../../api/profile-api";
import { OutPostDecisionDialog } from "./decisionDialog";
import { Post } from "../../model/post";
import { OutPostAllHistoryList } from "./outPost_allHistoryList";
import { OutPostList } from "./outPostList";
import { OutPostTabBar } from "./outPost_tabBar";
import { OutPostTabEnum } from "./outPost_tabEnum";
import { AppBodyBannerStyle } from "../../componentUi/style/appBodyBanner_style";
import { LoadingIcon } from "../../componentUi/loadingIcon";
import { AppCenterWrapStyle } from "../../componentUi/style/appCenterWrap_style";
import { TabPanelStyle } from "../../componentUi/style/tabPanel_style";

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
    isDecidingPost: false,

    selectTab: OutPostTabEnum.ALL
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

  async componentDidMount() {
    this.setPostsState(await API.outPosts());
  }

  setPostsState(posts) {
    this.setState({ posts });
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

  onTabChange = selectTab => {
    this.setState({ selectTab });
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
      returnNotePosts,
      selectTab
    } = this.state;

    return (
      <Fragment>
        <AppBodyBannerStyle>
          <OutPostTabBar
            selectTab={selectTab}
            onTabChange={this.onTabChange}
            onCreateNewPost={this.onOpenCrudDialog_create}
            allCount={posts.length}
            requestCount={requestNotePosts.length}
            borrowCount={borrowPosts.length}
            returnCount={returnNotePosts.length}
            historyCount={this.state.returnShares.length}
          />
        </AppBodyBannerStyle>

        <AppCenterWrapStyle>
          <TabPanelStyle show={selectTab === OutPostTabEnum.ALL}>
            {this._genPostList("outPostList-all-react", posts)}
          </TabPanelStyle>
          <TabPanelStyle show={selectTab === OutPostTabEnum.REQUEST}>
            {this._genPostList(
              "outPostList-requestNote-react",
              requestNotePosts
            )}
          </TabPanelStyle>
          <TabPanelStyle show={selectTab === OutPostTabEnum.BORROW}>
            {this._genPostList("outPostList-borrow-react", borrowPosts)}
          </TabPanelStyle>
          <TabPanelStyle show={selectTab === OutPostTabEnum.RETURN}>
            {this._genPostList("outPostList-returnNote-react", returnNotePosts)}
          </TabPanelStyle>
          <TabPanelStyle show={selectTab === OutPostTabEnum.HISTORY}>
            <OutPostAllHistoryList shares={this.state.returnShares} />
          </TabPanelStyle>
        </AppCenterWrapStyle>
      </Fragment>
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
  loginUser: PropTypes.object.isRequired
};

export { OutPostManagement };
