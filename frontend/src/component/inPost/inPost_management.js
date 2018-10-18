import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import className from "classnames";

import { InPostAllHistoryList } from "./inPost_allHistoryList";
import { API } from "../../api/profile-api";
import { Share } from "../../model/share";
import { InPostList } from "./inPostList";
import { LoadingIcon } from "../../util/loadingIcon";
import { InPostTabBar } from "./inPost_tabBar";
import { InPostTabEnum } from "./inPost_tabEnum";
import { AppComponentBanner } from "../../componentShare/appComponent_banner";

class InPostManagement extends Component {
  state = {
    posts: null,
    requestingPostIds: [],
    deletingShareIds: [],
    awaringShareIds: [],
    returningShareIds: [],
    selectTab: InPostTabEnum.ALL
  };

  static getDerivedStateFromProps(props, state) {
    let returnShares = null;
    let approveNotePosts = null;
    let approveNotePostCount = null;

    const { posts } = state;
    const { loginUser } = props;
    if (posts) {
      const myInShares2D = posts.map(post =>
        post.shares.filter(share => share.borrower.id === props.loginUser.id)
      );
      const myInShares1D = [].concat(...myInShares2D);
      returnShares = myInShares1D.filter(share => share.isReturn);
      approveNotePosts = posts.filter(post =>
        post.shares.some(
          share =>
            share.borrower.id === loginUser.id &&
            share.isApprove === true &&
            share.isAwareApprove === false &&
            share.isReturn === false
        )
      );
      approveNotePostCount = approveNotePosts.length;
    }

    return {
      returnShares,
      approveNotePosts,
      approveNotePostCount
    };
  }

  setPostsAndNotifyUnawareApproveShare(posts) {
    this.setState({ posts });
    this.props.onInPostNotify(this.state.approveNotePostCount);
  }

  async componentDidMount() {
    const posts = await API.inPosts();
    const inPostsFilterDeny = posts.filter(inPost =>
      inPost.denyShares.every(
        share => share.borrower.id !== this.props.loginUser.id
      )
    );
    this.setPostsAndNotifyUnawareApproveShare(inPostsFilterDeny);
  }

  onTabChange = selectTab => {
    this.setState({ selectTab });
  };

  onCreateShare = postId => {
    this.setState({
      requestingPostIds: [...this.state.requestingPostIds, postId]
    });
    (async () => {
      const { id, dateCreate } = await API.createShare(postId);

      const newShare = new Share(
        id,
        this.props.loginUser,
        new Date(dateCreate),
        undefined, //isApprove,
        false, //isAwareApprove,
        false, //isReturn,
        false, //isAwareReturn,
        null, //dateReturn
        null //post to be set later
      );
      const { posts } = this.state;
      const curPost = posts.find(post => post.id === postId);
      curPost.shares.push(newShare);
      newShare.post = curPost;

      this.setPostsAndNotifyUnawareApproveShare([
        ...posts.filter(post => post.id !== postId),
        curPost
      ]);
      this.setState({
        requestingPostIds: this.state.requestingPostIds.filter(
          id => id !== postId
        )
      });
    })();
  };

  onDeleteShare = shareId => {
    this.setState({
      deletingShareIds: [...this.state.deletingShareIds, shareId]
    });

    (async () => {
      await API.deleteShare(shareId);

      const { posts } = this.state;
      const curPost = posts.find(post =>
        post.shares.some(share => share.id === shareId)
      );
      curPost.shares = curPost.shares.filter(share => share.id !== shareId);
      this.setPostsAndNotifyUnawareApproveShare([
        ...posts.filter(post => post.id !== curPost.id),
        curPost
      ]);
      this.setState({
        deletingShareIds: [
          ...this.state.deletingShareIds.filter(id => id !== shareId)
        ]
      });
    })();
  };

  onReturnShare = shareId => {
    const curPost = this.state.posts.find(post =>
      post.shares.some(share => share.id === shareId)
    );
    if (
      window.confirm(
        `You are returning '${curPost.title}'. This can not be undo!`
      )
    ) {
      this.setState({
        returningShareIds: [...this.state.returningShareIds, shareId]
      });
      (async () => {
        const { resultIsReturnByTo, resultDateReturn } = await API.returnShare(
          shareId
        );

        const curShare = curPost.shares.find(share => share.id === shareId);
        curShare.isReturn = resultIsReturnByTo;
        curShare.setDateReturn(resultDateReturn);
        curPost.shares = [
          ...curPost.shares.filter(share => share.id !== shareId),
          curShare
        ];
        this.setPostsAndNotifyUnawareApproveShare([
          ...this.state.posts.filter(post => post.id !== curPost.id),
          curPost
        ]);
        this.setState({
          returningShareIds: [
            ...this.state.returningShareIds.filter(id => id !== shareId)
          ]
        });
      })();
    }
  };

  onAwareShare = shareId => {
    this.props.onInPostNotify(null);
    this.setState({
      awaringShareIds: [...this.state.awaringShareIds, shareId]
    });

    (async () => {
      const isAwareApprove = await API.awareApproveShare(shareId);
      const curPost = this.state.posts.find(post =>
        post.shares.some(share => share.id === shareId)
      );
      const curShare = curPost.shares.find(share => share.id === shareId);
      curShare.isAwareApprove = isAwareApprove;
      curPost.shares = [
        ...curPost.shares.filter(share => share.id !== shareId),
        curShare
      ];
      this.setPostsAndNotifyUnawareApproveShare([
        ...this.state.posts.filter(post => post.id !== curPost.id),
        curPost
      ]);
      this.setState({
        returningShareIds: [
          ...this.state.returningShareIds.filter(id => id !== shareId)
        ]
      });
    })();
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
        requestingPostIds={this.state.requestingPostIds}
        deletingShareIds={this.state.deletingShareIds}
        awaringShareIds={this.state.awaringShareIds}
        returningShareIds={this.state.returningShareIds}
        onCreateShare={this.onCreateShare}
        onDeleteShare={this.onDeleteShare}
        onAwareShare={this.onAwareShare}
        onReturnShare={this.onReturnShare}
      />
    );

    return (
      <Fragment>
        <AppComponentBanner>
          <InPostTabBar
            selectTab={selectTab}
            onTabChange={this.onTabChange}
            allCount={posts.length}
            requestCount={requestPosts.length}
            approveCount={this.state.approveNotePostCount}
            borrowCount={borrowPosts.length}
            historyCount={this.state.returnShares.length}
          />
        </AppComponentBanner>

        <div className="app-container">
          <div
            className={className({
              "tab-panel": true,
              "tab-panel-hide": selectTab !== InPostTabEnum.ALL
            })}
          >
            {generateList("inPostList-all-react", posts)}
          </div>
          <div
            className={className({
              "tab-panel": true,
              "tab-panel-hide": selectTab !== InPostTabEnum.REQUEST
            })}
          >
            {generateList("inPostList-request-react", requestPosts)}
          </div>
          <div
            className={className({
              "tab-panel": true,
              "tab-panel-hide": selectTab !== InPostTabEnum.APPROVE
            })}
          >
            {generateList(
              "inPostList-approveNote-react",
              this.state.approveNotePosts
            )}
          </div>
          <div
            className={className({
              "tab-panel": true,
              "tab-panel-hide": selectTab !== InPostTabEnum.BORROW
            })}
          >
            {generateList("inPostList-borrow-react", borrowPosts)}
          </div>
          <div
            className={className({
              "tab-panel": true,
              "tab-panel-hide": selectTab !== InPostTabEnum.HISTORY
            })}
          >
            <InPostAllHistoryList shares={this.state.returnShares} />
          </div>
        </div>
      </Fragment>
    );
  }

  render() {
    let content;
    if (this.state.posts) {
      content = this._getPostsContent(this.state.posts);
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
InPostManagement.propTypes = {
  loginUser: PropTypes.object.isRequired,
  onInPostNotify: PropTypes.func.isRequired
};

export { InPostManagement };
