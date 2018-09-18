import React, { Component } from "react";
import PropTypes from "prop-types";

import { InPostTable } from "./InPostTable";
import { InShareRequestTable } from "./InShareRequestTable";
import { InShareBorrowingTable } from "./InShareBorrowingTable";
import { InShareBorrowedTable } from "./InShareBorrowedTable";
import { API } from "../../api/profile-api";
import { Share } from "../../model/share";
import { LoadingIcon } from "../../util";

class InPostManagement extends Component {
  state = {
    inPosts: null,
    requestingPostIds: [],
    deletingShareIds: [],
    returningShareIds: []
  };

  static getDerivedStateFromProps(props, state) {
    let requestShares = null;
    let borrowingShares = null;
    let borrowedShares = null;

    if (state.inPosts) {
      const myInShares2D = state.inPosts.map(post =>
        post.shares.filter(share => share.borrower.id === props.loginUser.id)
      );
      const myInShares1D = [].concat(...myInShares2D);
      requestShares = myInShares1D.filter(share => share.isRequest);
      borrowingShares = myInShares1D.filter(share => share.isBorrowing);
      borrowedShares = myInShares1D.filter(share => share.isBorrowed);
    }

    return {
      requestShares,
      borrowingShares,
      borrowedShares
    };
  }

  async componentDidMount() {
    const inPosts = await API.inPosts();
    const inPostsFilterDeny = inPosts.filter(inPost =>
      inPost.denied.every(
        share => share.borrower.id !== this.props.loginUser.id
      )
    );

    this.setState({ inPosts: inPostsFilterDeny });
  }

  doCreateRequestShare = postId => {
    this.setState({
      requestingPostIds: [...this.state.requestingPostIds, postId]
    });
    (async () => {
      const {
        createdShareId,
        createdDateCreated,
        createdIsApprovedByFrom,
        createdIsReturnedByTo
      } = await API.createShare(postId);
      const newShare = new Share(
        createdShareId,
        this.props.loginUser,
        createdDateCreated,
        createdIsApprovedByFrom,
        createdIsReturnedByTo,
        null //post to be set later
      );
      const curPost = this.state.inPosts.find(post => post.id === postId);
      curPost.shares.push(newShare);
      newShare.post = curPost;
      this.setState({
        inPosts: [
          ...this.state.inPosts.filter(post => post.id !== postId),
          curPost
        ],
        requestingPostIds: this.state.requestingPostIds.filter(
          id => id !== postId
        )
      });
    })();
  };

  doDeleteRequestShare = shareId => {
    this.setState({
      deletingShareIds: [...this.state.deletingShareIds, shareId]
    });

    (async () => {
      await API.deleteShare(shareId);

      const { inPosts } = this.state;
      const curPost = inPosts.find(post =>
        post.shares.some(share => share.id === shareId)
      );
      curPost.shares = curPost.shares.filter(share => share.id !== shareId);
      this.setState({
        inPosts: [...inPosts.filter(post => post.id !== curPost.id), curPost]
      });
      this.setState({
        deletingShareIds: [
          ...this.state.deletingShareIds.filter(id => id !== shareId)
        ]
      });
    })();
  };

  doReturnBorrowingShare = shareId => {
    const curPost = this.state.inPosts.find(post =>
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
          inPosts: [
            ...this.state.inPosts.filter(post => post.id !== curPost.id),
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
    if (this.state.inPosts !== null) {
      content = (
        <div className="row">
          <div className="col-sm">
            <InPostTable
              loginUser={this.props.loginUser}
              inPosts={this.state.inPosts}
              requestingPostIds={this.state.requestingPostIds}
              onCreateRequestShareCb={this.doCreateRequestShare}
            />
          </div>
          <div className="col-sm">
            <InShareRequestTable
              shares={this.state.requestShares}
              onDeleteRequestShareCb={this.doDeleteRequestShare}
              deletingShareIds={this.state.deletingShareIds}
            />
            <InShareBorrowingTable
              shares={this.state.borrowingShares}
              returningShareIds={this.state.returningShareIds}
              onReturnBorrowingShareCb={this.doReturnBorrowingShare}
            />
            <InShareBorrowedTable shares={this.state.borrowedShares} />
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
