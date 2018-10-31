import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import { InPostAllHistoryList } from "./inPost_allHistoryList";
import { InPostList } from "./inPostList";
import { InPostTabBar } from "./inPost_tabBar";
import { InPostTabEnum } from "./inPost_tabEnum";
import { LoadingIcon } from "../../componentUi/loadingIcon";
import { AppBodyBannerStyle } from "../../componentUi/style/appBodyBanner_style";
import { AppCenterWrapStyle } from "../../componentUi/style/appCenterWrap_style";
import { TabPanelStyle } from "../../componentUi/style/tabPanel_style";
import {
  fetchInPosts,
  requestInPost,
  unRequestInPost
} from "../../action/inPost_action";
import { connect } from "react-redux";
import { filterInPostApproveAlert } from "../../reducer/inPost_reducer";

class InPostManagementComponent extends Component {
  static propTypes = {
    loginUser: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired,
    isFetchingPosts: PropTypes.bool.isRequired,
    isInitPosts: PropTypes.bool.isRequired,
    approveAlertPosts: PropTypes.array.isRequired,
    approveAlertPostCount: PropTypes.number.isRequired,
    returnShares: PropTypes.array.isRequired,
    requestingPostIds: PropTypes.array.isRequired,
    onRequestPost: PropTypes.func.isRequired,
    deletingShareIds: PropTypes.array.isRequired,
    onUnRequestPost: PropTypes.func.isRequired
  };

  state = {
    selectTab: InPostTabEnum.ALL
  };

  componentDidMount() {
    this.props.dispatch(fetchInPosts());
  }

  onTabChange = selectTab => {
    this.setState({ selectTab });
  };

  onReturnShare = shareId => {
    console.log("on return share clicked");
  };

  onAwareShare = shareId => {
    console.log("on aware share clicked");
  };

  _getPostsContent(posts) {
    const { selectTab } = this.state;

    const requestPosts = posts.filter(post =>
      post.requestShares.some(
        share => share.borrower.id === this.props.loginUser.id
      )
    );
    const borrowPosts = posts.filter(
      post =>
        post.curBorrowShare &&
        post.curBorrowShare.borrower.id === this.props.loginUser.id
    );

    const generateList = (listId, postArray) => (
      <InPostList
        listId={listId}
        loginUser={this.props.loginUser}
        posts={postArray}
        requestingPostIds={this.props.requestingPostIds}
        deletingShareIds={this.props.deletingShareIds}
        awaringShareIds={[]}
        returningShareIds={[]}
        onRequestPost={this.props.onRequestPost}
        onUnRequestPost={this.props.onUnRequestPost}
        onAwareShare={this.onAwareShare}
        onReturnShare={this.onReturnShare}
      />
    );

    return (
      <Fragment>
        <AppBodyBannerStyle>
          <InPostTabBar
            selectTab={selectTab}
            onTabChange={this.onTabChange}
            allCount={posts.length}
            requestCount={requestPosts.length}
            approveCount={this.props.approveAlertPostCount}
            borrowCount={borrowPosts.length}
            historyCount={this.props.returnShares.length}
          />
        </AppBodyBannerStyle>

        <AppCenterWrapStyle>
          <TabPanelStyle show={selectTab === InPostTabEnum.ALL}>
            {generateList("inPostList-all-react", posts)}
          </TabPanelStyle>
          <TabPanelStyle show={selectTab === InPostTabEnum.REQUEST}>
            {generateList("inPostList-request-react", requestPosts)}
          </TabPanelStyle>
          <TabPanelStyle show={selectTab === InPostTabEnum.APPROVE}>
            {generateList(
              "inPostList-approveNote-react",
              this.props.approveAlertPosts
            )}
          </TabPanelStyle>
          <TabPanelStyle show={selectTab === InPostTabEnum.BORROW}>
            {generateList("inPostList-borrow-react", borrowPosts)}
          </TabPanelStyle>
          <TabPanelStyle show={selectTab === InPostTabEnum.HISTORY}>
            <InPostAllHistoryList shares={this.props.returnShares} />
          </TabPanelStyle>
        </AppCenterWrapStyle>
      </Fragment>
    );
  }

  render() {
    let content;
    if (this.props.isInitPosts) {
      content = this._getPostsContent(this.props.posts);
    } else {
      content = (
        <h1 className="text-center">
          <LoadingIcon text="loading" />
        </h1>
      );
    }

    return <div id="inPostManagement-react">{content}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  const loginUser = state.auth.loginUser;
  const posts = state.inPost.posts;
  const approveAlertPosts = filterInPostApproveAlert(posts, loginUser.id);

  const myInShares2D = posts.map(post =>
    post.shares.filter(share => share.borrower.id === loginUser.id)
  );
  const myInShares1D = [].concat(...myInShares2D);
  const returnShares = myInShares1D.filter(share => share.isReturn);

  return {
    loginUser,
    posts,
    isFetchingPosts: state.inPost.isFetchingPosts,
    isInitPosts: state.inPost.isInitPosts,
    approveAlertPosts,
    approveAlertPostCount: approveAlertPosts.length,
    returnShares,
    requestingPostIds: state.inPost.requestingPostIds,
    deletingShareIds: state.inPost.deletingShareIds
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onRequestPost: postId => dispatch(requestInPost(postId)),
  onUnRequestPost: shareId => dispatch(unRequestInPost(shareId)),
  dispatch
});

const InPostManagementContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InPostManagementComponent);

export default InPostManagementContainer;
