import React from "react";
import PropTypes from "prop-types";

import PostItemBody from "../../postComponent/postItem_body";
import InPostItemFoot from "./foot/inPostItem_foot";
import PostItemStyle from "../../postComponent/style/postItem_style";
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
    onAwareShare,
    onReturnShare
  } = props;
  return (
    <PostItemStyle id="inPost-item-react">
      <InPostItemHead postUser={post.user} dateCreate={post.dateCreate} />
      <PostItemBody post={post} />
      <InPostItemFoot
        postId={post.id}
        loginUser={loginUser}
        isActive={post.isActive}
        curBorrowShare={post.curBorrowShare}
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
        onAwareShare={onAwareShare}
        onReturnShare={onReturnShare}
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
  onAwareShare: PropTypes.func.isRequired,
  onReturnShare: PropTypes.func.isRequired
};

export { InPostItem };
