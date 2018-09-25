import React, { Component } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";

import { InShareHistoryList } from "./inShareHistoryList";
import { API } from "../../api/profile-api";
import { Share } from "../../model/share";
import { LoadingIcon, computeNotificationCountHtml } from "../../util";
import { InPostList } from "./inPostList";

class InPostManagement extends Component {
  state = {
    posts: null,
    requestingPostIds: [],
    deletingShareIds: [],
    awaringShareIds: [],
    returningShareIds: []
  };

  static getDerivedStateFromProps(props, state) {
    let requestShares = null;
    let borrowShares = null;
    let returnShares = null;
    let unawareApprovePosts = null;
    let unawareApprovePostCount = null;

    const { posts } = state;
    const { loginUser } = props;
    if (posts) {
      const myInShares2D = posts.map(post =>
        post.shares.filter(share => share.borrower.id === props.loginUser.id)
      );
      const myInShares1D = [].concat(...myInShares2D);
      requestShares = myInShares1D.filter(share => share.isRequest);
      borrowShares = myInShares1D.filter(share => share.isBorrow);
      returnShares = myInShares1D.filter(share => share.isReturn);
      unawareApprovePosts = posts.filter(post =>
        post.shares.some(
          share =>
            share.borrower.id === loginUser.id &&
            share.isApprove === true &&
            share.isAwareApprove === false &&
            share.isReturn === false
        )
      );
      unawareApprovePostCount = unawareApprovePosts.length;
    }

    return {
      requestShares,
      borrowShares,
      returnShares,
      unawareApprovePosts,
      unawareApprovePostCount
    };
  }

  setPostsAndNotifyUnawareApproveShare(posts) {
    this.setState({ posts });
    this.props.onUnawareApprovePostCountChange(
      this.state.unawareApprovePostCount
    );
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
    this.props.onUnawareApprovePostCountChange(null);
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

    const generateList = postArray => (
      <InPostList
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
      <div className="container-fluid ">
        <Tabs forceRenderTabPanel={true}>
          <div className="text-center">
            <TabList>
              <Tab>
                <span id="tabSelector_inPost_all">
                  all
                  {computeNotificationCountHtml(posts.length, false)}
                </span>
              </Tab>
              <Tab>
                <span id="tabSelector_inPost_waitingList">
                  waiting list
                  {computeNotificationCountHtml(requestPosts.length, false)}
                </span>
              </Tab>
              <Tab>
                <span id="tabSelector_inPost_approve">
                  approve
                  {computeNotificationCountHtml(
                    this.state.unawareApprovePostCount
                  )}
                </span>
              </Tab>
              <Tab>
                <span id="tabSelector_inPost_borrow">
                  borrow
                  {computeNotificationCountHtml(borrowPosts.length, false)}
                </span>
              </Tab>
              <Tab>
                <span id="tabSelector_inPost_history">
                  history
                  {computeNotificationCountHtml(
                    this.state.returnShares.length,
                    false
                  )}
                </span>
              </Tab>
            </TabList>
          </div>
          <TabPanel>{generateList(posts)}</TabPanel>
          <TabPanel>{generateList(requestPosts)}</TabPanel>
          <TabPanel>{generateList(this.state.unawareApprovePosts)}</TabPanel>
          <TabPanel>{generateList(borrowPosts)}</TabPanel>
          <TabPanel>
            <InShareHistoryList shares={this.state.returnShares} />
          </TabPanel>
        </Tabs>
      </div>
    );
  }

  render() {
    let content;
    if (this.state.posts) {
      content = this._getPostsContent(this.state.posts);
    } else {
      content = (
        <h1 className="text-center">
          <LoadingIcon text="loading" isAnimate={true} />
        </h1>
      );
    }

    return <div id="InPostManagement-react">{content}</div>;
  }
}
InPostManagement.propTypes = {
  loginUser: PropTypes.object.isRequired,
  onUnawareApprovePostCountChange: PropTypes.func.isRequired
};

export { InPostManagement };
