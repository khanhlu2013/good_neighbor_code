import React, { Component } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";

import "./inPost.css";
import { InShareReturnTable } from "./inShareReturnTable";
import { API } from "../../api/profile-api";
import { Share } from "../../model/share";
import { LoadingIcon, computeNotificationCountHtml } from "../../util";
import { InPostList } from "./inPostList";

class InPostManagement extends Component {
  state = {
    posts: null,
    unawareApproveShareCount: null,
    requestingPostIds: [],
    deletingShareIds: [],
    awaringShareIds: [],
    returningShareIds: []
  };

  static getDerivedStateFromProps(props, state) {
    let requestShares = null;
    let borrowShares = null;
    let returnShares = null;
    let unawareApproveShareCount = null;
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
      unawareApproveShareCount = InPostManagement.countUnawareApproveShare(
        posts,
        loginUser
      );
    }

    return {
      requestShares,
      borrowShares,
      returnShares,
      unawareApproveShareCount
    };
  }

  static countUnawareApproveShare(posts, loginUser) {
    if (posts === null) {
      return null;
    }

    const shares_2D = posts.map(post =>
      post.shares.filter(
        share =>
          share.borrower.id === loginUser.id &&
          share.isApprove === true &&
          share.isAwareApprove === false &&
          share.isReturn === false
      )
    );
    const shares_1D = [].concat(...shares_2D);
    return shares_1D.length;
  }

  setPostsAndNotifyUnawareApproveShare(posts) {
    this.setState({ posts });
    this.props.onUnawareApproveShareCountChange(
      this.state.unawareApproveShareCount
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
      const { id, dateCreated } = await API.createShare(postId);

      const newShare = new Share(
        id,
        this.props.loginUser,
        new Date(dateCreated),
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
        const { resultIsReturnByTo } = await API.returnShare(shareId);

        const curShare = curPost.shares.find(share => share.id === shareId);
        curShare.isReturn = resultIsReturnByTo;
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
    this.props.onUnawareApproveShareCountChange(null);
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

  _getPostsContent() {
    const posts = this.state.posts;

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
          <div id="TabSelector-InPost-react" className="text-center">
            <TabList>
              <Tab>
                <span id="TabSelector_InPost_all">all</span>
              </Tab>
              <Tab>
                <span id="TabSelector_InPost_request">waiting list</span>
              </Tab>
              <Tab>
                <span id="TabSelector_InPost_borrow">
                  borrow
                  {computeNotificationCountHtml(
                    this.state.unawareApproveShareCount
                  )}
                </span>
              </Tab>
              <Tab>
                <span id="TabSelector_InPost_return">history</span>
              </Tab>
            </TabList>
          </div>
          <TabPanel>{generateList(posts)}</TabPanel>
          <TabPanel>{generateList(requestPosts)}</TabPanel>
          <TabPanel>{generateList(borrowPosts)}</TabPanel>
          <TabPanel>
            <InShareReturnTable shares={this.state.returnShares} />
          </TabPanel>
        </Tabs>
      </div>
    );
  }

  render() {
    let content;
    if (this.state.posts !== null) {
      content = this._getPostsContent();
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
  onUnawareApproveShareCountChange: PropTypes.func.isRequired
};

export { InPostManagement };
