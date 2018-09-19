import React, { Component } from "react";
import PropTypes from "prop-types";

import { InPostTable } from "./InPostTable";
import { InShareRequestTable } from "./InShareRequestTable";
import { InShareBorrowTable } from "./InShareBorrowTable";
import { InShareReturnTable } from "./InShareReturnTable";
import { API } from "../../api/profile-api";
import { Share } from "../../model/share";
import { LoadingIcon } from "../../util";

class InPostManagement extends Component {
  state = {
    posts: null,
    requestingPostIds: [],
    deletingShareIds: [],
    returningShareIds: []
  };

  static getDerivedStateFromProps(props, state) {
    let requestShares = null;
    let borrowShares = null;
    let returnShares = null;

    if (state.posts) {
      const myInShares2D = state.posts.map(post =>
        post.shares.filter(share => share.borrower.id === props.loginUser.id)
      );
      const myInShares1D = [].concat(...myInShares2D);
      requestShares = myInShares1D.filter(share => share.isRequest);
      borrowShares = myInShares1D.filter(share => share.isBorrow);
      returnShares = myInShares1D.filter(share => share.isReturn);
    }

    return {
      requestShares,
      borrowShares,
      returnShares
    };
  }

  async componentDidMount() {
    const posts = await API.inPosts();
    const inPostsFilterDeny = posts.filter(inPost =>
      inPost.denyShares.every(
        share => share.borrower.id !== this.props.loginUser.id
      )
    );

    this.setState({ posts: inPostsFilterDeny });
  }

  onCreateShare = postId => {
    this.setState({
      requestingPostIds: [...this.state.requestingPostIds, postId]
    });
    (async () => {
      const {
        createdShareId,
        createdDateCreated,
        createdIsApprovedByFrom,
        createdIsReceivedByTo,
        createdIsReturnedByTo,
        createdIsReceivedByFrom
      } = await API.createShare(postId);
      const newShare = new Share(
        createdShareId,
        this.props.loginUser,
        createdDateCreated,
        createdIsApprovedByFrom,
        createdIsReceivedByTo,
        createdIsReturnedByTo,
        createdIsReceivedByFrom,
        null //post to be set later
      );
      const { posts } = this.state;
      const curPost = posts.find(post => post.id === postId);
      curPost.shares.push(newShare);
      newShare.post = curPost;
      this.setState({
        posts: [...posts.filter(post => post.id !== postId), curPost],
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
      this.setState({
        posts: [...posts.filter(post => post.id !== curPost.id), curPost]
      });
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
        const isReturnedByTo = true;
        const { resultIsReturnByTo } = await API.updateInShare(
          shareId,
          isReturnedByTo
        );

        const curShare = curPost.shares.find(share => share.id === shareId);
        curShare.isReturnedByTo = resultIsReturnByTo;
        curPost.shares = [
          ...curPost.shares.filter(share => share.id !== shareId),
          curShare
        ];
        this.setState({
          posts: [
            ...this.state.posts.filter(post => post.id !== curPost.id),
            curPost
          ],
          returningShareIds: [
            ...this.state.returningShareIds.filter(id => id !== shareId)
          ]
        });
      })();
    }
  };

  render() {
    let content;
    if (this.state.posts !== null) {
      content = (
        <div className="row">
          <div className="col-sm">
            <InPostTable
              loginUser={this.props.loginUser}
              posts={this.state.posts}
              requestingPostIds={this.state.requestingPostIds}
              onCreateShare={this.onCreateShare}
            />
          </div>
          <div className="col-sm">
            <InShareRequestTable
              shares={this.state.requestShares}
              deletingShareIds={this.state.deletingShareIds}
              onDeleteShare={this.onDeleteShare}
            />
            <InShareBorrowTable
              shares={this.state.borrowShares}
              returningShareIds={this.state.returningShareIds}
              onReturnShare={this.onReturnShare}
            />
            <InShareReturnTable shares={this.state.returnShares} />
          </div>
        </div>
      );
    } else {
      content = (
        <h1 className="text-center">
          <LoadingIcon text="loading" isAnimate={true} />
        </h1>
      );
    }

    return (
      <div id="InPostManagement-react" className="container">
        {content}
      </div>
    );
  }
}
InPostManagement.propTypes = {
  loginUser: PropTypes.object.isRequired
};

export { InPostManagement };
