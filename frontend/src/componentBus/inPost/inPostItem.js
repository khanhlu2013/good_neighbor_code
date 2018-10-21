import React from "react";
import PropTypes from "prop-types";

import { InPostItemFoot } from "./inPostItem_foot";
import { PostItemBody } from "../post/postItem_body";
import { InPostItemHead } from "./inPostItem_head";
import { PostItemStyle } from "../post/style/postItem_style";

function InPostItem(props) {
  const {
    loginUser,
    post,
    isRequestingPost,
    isDeleteingShare,
    isAwaringShare,
    isReturningShare,
    onCreateShare,
    onDeleteShare,
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
        onCreateShare={onCreateShare}
        onDeleteShare={onDeleteShare}
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
  onCreateShare: PropTypes.func.isRequired,
  onDeleteShare: PropTypes.func.isRequired,
  onAwareShare: PropTypes.func.isRequired,
  onReturnShare: PropTypes.func.isRequired
};

export { InPostItem };
