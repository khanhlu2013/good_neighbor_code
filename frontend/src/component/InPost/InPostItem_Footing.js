import React from "react";
import PropTypes from "prop-types";
import { User } from "../../model/user";
import { nullOrRequiredValidator } from "../../util";
import { Share } from "../../model/share";
import { InPostItemFootingApprove } from "./inPostItem_footing_approve";
import { InPostItemFootingRequest } from "./inPostItem_footing_request";
import { InPostItemFootingShop } from "./inPostItem_footing_shop";

function InPostItemFooting(props) {
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
      <InPostItemFootingRequest
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
      <InPostItemFootingApprove
        curBorrowShare={curBorrowShare}
        isAwaringShare={isAwaringShare}
        isReturningShare={isReturningShare}
        onAwareShare={onAwareShare}
        onReturnShare={onReturnShare}
      />
    );
  } else if (isActive) {
    content = (
      <InPostItemFootingShop
        postId={postId}
        isRequestingPost={isRequestingPost}
        onCreateShare={onCreateShare}
      />
    );
  } else {
    content = <div>Post is no longer active</div>;
  }

  return (
    <div>
      <div className="text-left">
        {curBorrowShare &&
          curBorrowShare.borrower.id !== loginUser.id && (
            <span>
              <span className="text-muted font-weight-light">
                currently borrow by:{" "}
              </span>
              {curBorrowShare.borrower.getNameAndEmail()}
            </span>
          )}
      </div>
      <div className="text-right">{content}</div>
    </div>
  );
}
InPostItemFooting.propTypes = {
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

export { InPostItemFooting };
