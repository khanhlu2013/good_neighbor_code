import React from "react";
import PropTypes from "prop-types";

import PostItemBody from "../../post/component/postItem_body";
import InPostItemFoot from "./foot/inPostItem_foot";
import PostItemStyle from "../../post/component/style/postItem_style";
import InPostItemHead from "./inPostItem_head";

function InPostItem(props) {
  const {
    loginUser,
    post,
    isRequestingPost,
    isUnRequestingPost,
    isAwaringShare,
    isReturningShare,
    requestPostHandler,
    unRequestPostHandler,
    awareApprovePostHandler,
    returnPostHandler
  } = props;
  const myRequestShare =
    post.requestShares.find(share => share.borrower.id === loginUser.id) ||
    null;

  return (
    <PostItemStyle id="inPost-item-react">
      <InPostItemHead postUser={post.user} dateCreate={post.dateCreate} />
      <PostItemBody post={post} />
      <InPostItemFoot
        postId={post.id}
        loginUser={loginUser}
        isActive={post.isActive}
        currentlyBorrowShare={post.curBorrowShare}
        myRequestShare={myRequestShare}
        isRequestingPost={isRequestingPost}
        isUnRequestingPost={isUnRequestingPost}
        isAwaringShare={isAwaringShare}
        isReturningShare={isReturningShare}
        requestPostHandler={requestPostHandler}
        unRequestPostHandler={unRequestPostHandler}
        awareApprovePostHandler={awareApprovePostHandler}
        returnPostHandler={returnPostHandler}
      />
    </PostItemStyle>
  );
}
InPostItem.propTypes = {
  loginUser: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  isRequestingPost: PropTypes.bool.isRequired,
  isUnRequestingPost: PropTypes.bool.isRequired,
  isAwaringShare: PropTypes.bool.isRequired,
  isReturningShare: PropTypes.bool.isRequired,
  requestPostHandler: PropTypes.func.isRequired,
  unRequestPostHandler: PropTypes.func.isRequired,
  awareApprovePostHandler: PropTypes.func.isRequired,
  returnPostHandler: PropTypes.func.isRequired
};

export { InPostItem };
