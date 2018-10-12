import React from "react";
import PropTypes from "prop-types";
import { InPostItemFooting } from "./inPostItem_footing";
import { PostItemBody } from "../post/postItem_body";
import { InPostItemHead } from "./inPostItem_head";

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
    <div id="inPost-item-react" className="post-item shadow-box">
      <InPostItemHead postUser={post.user} dateCreate={post.dateCreate} />
      <PostItemBody post={post} />
      <InPostItemFooting
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
    </div>
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
