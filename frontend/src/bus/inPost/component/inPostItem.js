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
    isDeleteingShare,
    isAwaringShare,
    isReturningShare,
    onRequestPost,
    onUnRequestPost,
    onAwareApprovePost,
    onReturnPost
  } = props;
  return (
    <PostItemStyle id="inPost-item-react">
      <InPostItemHead postUser={post.user} dateCreate={post.dateCreate} />
      <PostItemBody post={post} />
      <InPostItemFoot
        postId={post.id}
        loginUser={loginUser}
        isActive={post.isActive}
        currentlyBorrowShare={post.curBorrowShare}
        myRequestShare={
          post.requestShares.find(
            share => share.borrower.id === loginUser.id
          ) || null
        }
        isRequestingPost={isRequestingPost}
        isDeleteingShare={isDeleteingShare}
        isAwaringShare={isAwaringShare}
        isReturningShare={isReturningShare}
        onRequestPost={onRequestPost}
        onUnRequestPost={onUnRequestPost}
        onAwareApprovePost={onAwareApprovePost}
        onReturnPost={onReturnPost}
      />
    </PostItemStyle>
  );
}
InPostItem.propTypes = {
  loginUser: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  isRequestingPost: PropTypes.bool.isRequired,
  isDeleteingShare: PropTypes.bool.isRequired,
  isAwaringShare: PropTypes.bool.isRequired,
  isReturningShare: PropTypes.bool.isRequired,
  onRequestPost: PropTypes.func.isRequired,
  onUnRequestPost: PropTypes.func.isRequired,
  onAwareApprovePost: PropTypes.func.isRequired,
  onReturnPost: PropTypes.func.isRequired
};

export { InPostItem };
