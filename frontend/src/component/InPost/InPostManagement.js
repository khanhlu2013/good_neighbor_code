import React from "react";
import PropTypes from "prop-types";
import { InPostTable } from "./InPostTable";
import { InShareRequestingTable } from "./InShareRequestingTable";

function InPostManagement(props) {
  const {
    loginUser,
    inPosts,
    isRefreshingInPosts,
    onDeleteRequestingShareCb,
    onCreateShareCb
  } = props;
  const myInPostShares2D = inPosts.map(post =>
    post.shares.filter(share => share.borrower.id === loginUser.id)
  );
  const myInPostShares = [].concat(...myInPostShares2D);
  const requestingShares = myInPostShares.filter(
    share =>
      share.isApprovedByFrom === undefined && share.isReturnedByTo === false
  );

  return (
    <div id="InPostManagement-react">
      <h1>InPosts Managements</h1>
      <InPostTable
        loginUser={loginUser}
        allInPosts={inPosts}
        onCreateShareCb={onCreateShareCb}
      />
      <InShareRequestingTable
        requestingShares={requestingShares}
        onDeleteRequestingShareCb={onDeleteRequestingShareCb}
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
  onCreateShareCb: PropTypes.func.isRequired
};

export { InPostManagement };
