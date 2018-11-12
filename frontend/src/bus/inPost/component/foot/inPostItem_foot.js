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
    isUnRequestingPost,
    isAwaringShare,
    isReturningShare,
    requestPostHandler,
    unRequestPostHandler,
    awareApprovePostHandler,
    returnPostHandler
  } = props;

  let content;

  if (myRequestShare) {
    content = (
      <InPostItemFootRequest
        isUnRequestingPost={isUnRequestingPost}
        unRequestPostHandler={unRequestPostHandler}
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
        awareApprovePostHandler={awareApprovePostHandler}
        returnPostHandler={returnPostHandler}
      />
    );
  } else if (isActive) {
    content = (
      <InPostItemFootShop
        postId={postId}
        isRequestingPost={isRequestingPost}
        requestPostHandler={requestPostHandler}
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
  isUnRequestingPost: PropTypes.bool.isRequired,
  isAwaringShare: PropTypes.bool.isRequired,
  isReturningShare: PropTypes.bool.isRequired,
  requestPostHandler: PropTypes.func.isRequired,
  unRequestPostHandler: PropTypes.func.isRequired,
  awareApprovePostHandler: PropTypes.func.isRequired,
  returnPostHandler: PropTypes.func.isRequired
};

export default InPostItemFoot;
