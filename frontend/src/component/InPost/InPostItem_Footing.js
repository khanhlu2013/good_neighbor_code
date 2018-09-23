import React from "react";
import PropTypes from "prop-types";
import className from "classnames";
import { User } from "../../model/user";
import { nullOrRequiredValidator, LoadingIcon } from "../../util";
import { Share } from "../../model/share";
import { InPostItemFootingApprove } from "./inPostItem_footing_approve";
import { InPostItemFootingRequest } from "./inPostItem_footing_request";

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

  const onCreateShareClicked = e => {
    onCreateShare(postId);
  };

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
  } else if (!isActive) {
    content = <div>Post is no longer active</div>;
  } else {
    content = (
      <button
        className={className({
          btn: true,
          "btn-success": !isRequestingPost,
          "btn-secondary": isRequestingPost,
          disabled: isRequestingPost
        })}
        onClick={onCreateShareClicked}
      >
        {isRequestingPost ? (
          <LoadingIcon text="requesting" isAnimate={true} />
        ) : (
          "request"
        )}
      </button>
    );
  }

  return <div className="text-right">{content}</div>;
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
