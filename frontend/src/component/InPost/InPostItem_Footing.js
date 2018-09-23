import React from "react";
import PropTypes from "prop-types";
import className from "classnames";
import { User } from "../../model/user";
import { nullOrRequiredValidator, LoadingIcon } from "../../util";
import { Share } from "../../model/share";

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

  const onUndoRequestClicked = e => {
    onDeleteShare(myRequestShare.id);
  };

  const onAwareShareClicked = e => {
    onAwareShare(curBorrowShare.id);
  };

  const onReturnShareClicked = e => {
    onReturnShare(curBorrowShare.id);
  };

  let content;

  if (myRequestShare) {
    content = (
      <div className="text-success">
        You are in the waiting list. Please wait for response.
        <button
          onClick={onUndoRequestClicked}
          className={className({
            btn: true,
            "btn-warning": !isDeleteingShare,
            "btn-secondary": isDeleteingShare
          })}
        >
          {isDeleteingShare ? (
            <LoadingIcon text="undo" isAnimate={true} />
          ) : (
            "undo"
          )}
        </button>
      </div>
    );
  } else if (
    curBorrowShare !== null &&
    curBorrowShare.borrower.id === loginUser.id
  ) {
    let awareContent = null;
    if (!curBorrowShare.isAwareApprove) {
      awareContent = (
        <button
          className={className({
            btn: true,
            "btn-success": !isAwaringShare,
            "btn-secondary": isAwaringShare,
            disabled: isAwaringShare
          })}
          onClick={onAwareShareClicked}
        >
          {isAwaringShare ? (
            <LoadingIcon text={null} isAnimate={true} />
          ) : (
            "I've received "
          )}
        </button>
      );
    }
    const returnContent = (
      <button
        className={className({
          btn: true,
          "btn-warning": !isReturningShare,
          "btn-secondary": isReturningShare,
          disabled: isReturningShare
        })}
        onClick={onReturnShareClicked}
      >
        {isReturningShare ? (
          <LoadingIcon text={null} isAnimate={true} />
        ) : (
          "return"
        )}
      </button>
    );

    content = (
      <div className="text-success">
        Your request is approved
        {awareContent}
        {returnContent}
      </div>
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
