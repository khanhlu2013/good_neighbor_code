import React from "react";
import PropTypes from "prop-types";
import User from "../../../../model/user";
import Share from "../../../../model/share";
import PostItemFootStyle from "../../../post/component/style/postItem_foot_style";
import InPostItemFootApprove from "./inPostItem_foot_approve";
import InPostItemFootShop from "./inPostItem_foot_shop";
import InPostItemFootRequest from "./inPostItem_foot_request";
import { nullOrRequiredValidator } from "../../../../share/util";

function InPostItemFoot(props) {
  const {
    postId,
    loginUser,
    isActive,
    currentlyBorrowShare,
    myRequestShare,
    isRequestingPost,
    isDeleteingShare,
    isAwaringShare,
    isReturningShare,
    onRequestPost,
    onUnRequestPost,
    onAwareApprovePost,
    onReturnPost
  } = props;

  let content;

  if (myRequestShare) {
    content = (
      <InPostItemFootRequest
        isDeleteingShare={isDeleteingShare}
        onUnRequestPost={onUnRequestPost}
        requestShareId={myRequestShare.id}
      />
    );
  } else if (
    currentlyBorrowShare !== null &&
    currentlyBorrowShare.borrower.id === loginUser.id
  ) {
    content = (
      <InPostItemFootApprove
        approveShare={currentlyBorrowShare}
        isAwaringShare={isAwaringShare}
        isReturningShare={isReturningShare}
        onAwareApprovePost={onAwareApprovePost}
        onReturnPost={onReturnPost}
      />
    );
  } else if (isActive) {
    content = (
      <InPostItemFootShop
        postId={postId}
        isRequestingPost={isRequestingPost}
        onRequestPost={onRequestPost}
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
  currentlyBorrowShare: nullOrRequiredValidator("object", Share),
  myRequestShare: nullOrRequiredValidator("object", Share),
  isRequestingPost: PropTypes.bool.isRequired,
  isDeleteingShare: PropTypes.bool.isRequired,
  isAwaringShare: PropTypes.bool.isRequired,
  isReturningShare: PropTypes.bool.isRequired,
  onRequestPost: PropTypes.func.isRequired,
  onUnRequestPost: PropTypes.func.isRequired,
  onAwareApprovePost: PropTypes.func.isRequired,
  onReturnPost: PropTypes.func.isRequired
};

export default InPostItemFoot;