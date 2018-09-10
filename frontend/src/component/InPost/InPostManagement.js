import React, { Component } from "react";
import PropTypes from "prop-types";
import className from "classnames";

import { InPostTable } from "./InPostTable";
import { InShareRequestingTable } from "./InShareRequestingTable";
import { InShareBorrowingTable } from "./InShareBorrowingTable";
import { InShareBorrowedTable } from "./InShareBorrowedTable";
import { API } from "../../api/profile-api";

class InPostManagement extends Component {
  state = {
    inPosts: null
  };

  static getDerivedStateFromProps(props, state) {
    let requestingShares = null;
    let borrowingShares = null;
    let borrowedShares = null;

    if (state.inPosts) {
      const myInShares2D = state.inPosts.map(post =>
        post.shares.filter(share => share.borrower.id === props.loginUser.id)
      );
      const myInShares1D = [].concat(...myInShares2D);
      requestingShares = myInShares1D.filter(share => share.isRequesting);
      borrowingShares = myInShares1D.filter(share => share.isBorrowing);
      borrowedShares = myInShares1D.filter(share => share.isBorrowed);
    }

    return {
      requestingShares,
      borrowingShares,
      borrowedShares
    };
  }

  componentDidMount() {
    this.refreshInPosts();
  }

  refreshInPosts = async () => {
    const inPosts = await API.inPosts();
    const inPostsFilterDeny = inPosts.filter(inPost =>
      inPost.denied.every(
        share => share.borrower.id !== this.props.loginUser.id
      )
    );

    this.setState({ inPosts: inPostsFilterDeny });
  };

  doCreateRequestingShare = postID => {
    this.setState({ inPosts: null });
    (async () => {
      await API.createShare(postID);
      this.refreshInPosts();
    })();
  };

  doDeleteRequestingShare = shareID => {
    this.setState({ inPosts: null });
    (async () => {
      await API.deleteShare(shareID);
      this.refreshInPosts();
    })();
  };

  doReturnBorrowingShare = shareID => {
    const [post] = this.state.inPosts.filter(
      post => post.shares.filter(share => share.id === shareID).length === 1
    );
    if (
      window.confirm(`You are returning ${post.title}. This can not be undo!`)
    ) {
      this.setState({ inPosts: null });
      (async () => {
        const isReturnedByTo = true;
        await API.updateInShare(shareID, isReturnedByTo);
        this.refreshInPosts();
      })();
    }
  };

  render() {
    const isRefreshingInPosts = this.state.inPosts === null;
    return (
      <div
        id="InPostManagement-react"
        className={className({ isRefreshingInPosts })}
      >
        <h1>InPosts Managements</h1>

        {!isRefreshingInPosts && (
          <div>
            <InPostTable
              loginUser={this.props.loginUser}
              inPosts={this.state.inPosts}
              onCreateRequestingShareCb={this.doCreateRequestingShare}
            />
            <InShareRequestingTable
              shares={this.state.requestingShares}
              onDeleteRequestingShareCb={this.doDeleteRequestingShare}
            />
            <InShareBorrowingTable
              shares={this.state.borrowingShares}
              onReturnBorrowingShareCb={this.doReturnBorrowingShare}
            />
            <InShareBorrowedTable shares={this.state.borrowedShares} />
          </div>
        )}
      </div>
    );
  }
}
InPostManagement.propTypes = {
  loginUser: PropTypes.object.isRequired
};

export { InPostManagement };
