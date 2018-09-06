import React from "react";
import PropTypes from "prop-types";
import { InPostTable } from "./InPostTable";
import { InShareRequestingTable } from "./InShareRequestingTable";
import { InShareBorrowingTable } from "./InShareBorrowingTable";

function InPostManagement(props) {
  const {
    loginUser,
    inPosts,
    isRefreshingInPosts,
    onCreateRequestingShareCb,
    onDeleteRequestingShareCb,
    onReturnBorrowingShareCb
  } = props;
  const myInShares2D = inPosts.map(post =>
    post.shares.filter(share => share.borrower.id === loginUser.id)
  );
  const myInShares1D = [].concat(...myInShares2D);
  const requestingShares = myInShares1D.filter(share => share.isRequesting);
  const borrowingShares = myInShares1D.filter(share => share.isBorrowing);

  return (
    <div id="InPostManagement-react">
      <h1>InPosts Managements</h1>
      <InPostTable
        loginUser={loginUser}
        allInPosts={inPosts}
        onCreateRequestingShareCb={onCreateRequestingShareCb}
      />
      <InShareRequestingTable
        shares={requestingShares}
        onDeleteRequestingShareCb={onDeleteRequestingShareCb}
      />
      <InShareBorrowingTable
        shares={borrowingShares}
        onReturnBorrowingShareCb={onReturnBorrowingShareCb}
      />

      {isRefreshingInPosts && <p>Refreshing in posts ...</p>}
    </div>
  );
}
InPostManagement.propTypes = {
  loginUser: PropTypes.object.isRequired,
  inPosts: PropTypes.array.isRequired,
  isRefreshingInPosts: PropTypes.bool.isRequired,
  onDeleteRequestingShareCb: PropTypes.func.isRequired,
  onCreateRequestingShareCb: PropTypes.func.isRequired,
  onReturnBorrowingShareCb: PropTypes.func.isRequired
};

export { InPostManagement };
