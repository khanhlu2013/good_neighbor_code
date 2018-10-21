import React from "react";
import PropTypes from "prop-types";
import { User } from "../../model/user";
import { nullOrRequiredValidator } from "../../util";
import { Share } from "../../model/share";
import { InPostItemFootApprove } from "./inPostItem_foot_approve";
import { InPostItemFootRequest } from "./inPostItem_foot_request";
import { InPostItemFootShop } from "./inPostItem_foot_shop";
import { PostItemFootStyle } from "../post/style/postItem_foot_style";

function InPostItemFoot(props) {
  const {
    postId,
    loginUser,
    isActive,
    curBorrowShare,
    myRequestShare,
    isRequestingPost,
    isDeleteingShare,
    isAwaringShare,
    isReturningShare,
    onCreateShare,
    onDeleteShare,
    onAwareShare,
    onReturnShare
  } = props;

  let content;

  if (myRequestShare) {
    content = (
      <InPostItemFootRequest
        isDeleteingShare={isDeleteingShare}
        onDeleteShare={onDeleteShare}
        myRequestShareId={myRequestShare.id}
      />
    );
  } else if (
    curBorrowShare !== null &&
    curBorrowShare.borrower.id === loginUser.id
  ) {
    content = (
      <InPostItemFootApprove
        curBorrowShare={curBorrowShare}
        isAwaringShare={isAwaringShare}
        isReturningShare={isReturningShare}
        onAwareShare={onAwareShare}
        onReturnShare={onReturnShare}
      />
    );
  } else if (isActive) {
    content = (
      <InPostItemFootShop
        postId={postId}
        isRequestingPost={isRequestingPost}
        onCreateShare={onCreateShare}
      />
    );
  } else {
    content = <div>Post is no longer active</div>;
  }

  return <PostItemFootStyle>{content}</PostItemFootStyle>;
}
InPostItemFoot.propTypes = {
  postId: PropTypes.string.isRequired,
  loginUser: PropTypes.instanceOf(User).isRequired,
  isActive: PropTypes.bool.isRequired,
  curBorrowShare: nullOrRequiredValidator("object", Share),
  myRequestShare: nullOrRequiredValidator("object", Share),
  isRequestingPost: PropTypes.bool.isRequired,
  isDeleteingShare: PropTypes.bool.isRequired,
  isAwaringShare: PropTypes.bool.isRequired,
  isReturningShare: PropTypes.bool.isRequired,
  onCreateShare: PropTypes.func.isRequired,
  onDeleteShare: PropTypes.func.isRequired,
  onAwareShare: PropTypes.func.isRequired,
  onReturnShare: PropTypes.func.isRequired
};

export { InPostItemFoot };
