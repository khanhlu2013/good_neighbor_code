import React from "react";
import PropTypes from "prop-types";
import { InPostFromAll } from "./InPosts_FromAll";
import { InPostsToMe } from "./InPosts_ToMe";

function InPostManagement(props) {
  const {
    inPosts,
    loginUser,
    onDeleteRequestingShareCb,
    onCreateShareCb
  } = props;
  const myInPostShares2D = inPosts.map(post =>
    post.shares.filter(share => share.borrower.id === loginUser.id)
  );
  const myInPostShares = [].concat(...myInPostShares2D);

  return (
    <div id="InPostManagement-react">
      <h1>InPosts Managements</h1>
      <InPostFromAll
        loginUser={loginUser}
        allInPosts={inPosts}
        onCreateShareCb={onCreateShareCb}
      />
      <InPostsToMe
        shares={myInPostShares}
        onDeleteRequestingShareCb={onDeleteRequestingShareCb}
      />
    </div>
  );
}
InPostManagement.propTypes = {
  inPosts: PropTypes.array.isRequired,
  loginUser: PropTypes.object.isRequired,
  onDeleteRequestingShareCb: PropTypes.func.isRequired,
  onCreateShareCb: PropTypes.func.isRequired
};

export { InPostManagement };
