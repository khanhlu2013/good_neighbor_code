import React from "react";
import PropTypes from "prop-types";
import className from "classnames";

import { nullOrRequiredValidator, LoadingIcon } from "../../util";
import { Share } from "../../model/share";

function InPostItemFootingApprove(props) {
  const {
    // postId,
    // loginUser,
    // isActive,
    curBorrowShare,
    // myRequestShare,
    // isRequestingPost,
    // isDeleteingShare,
    isAwaringShare,
    isReturningShare,
    // onCreateShare,
    // onDeleteShare,
    onAwareShare,
    onReturnShare
  } = props;

  const onAwareShareClicked = e => {
    onAwareShare(curBorrowShare.id);
  };
  const onReturnShareClicked = e => {
    onReturnShare(curBorrowShare.id);
  };

  let awareContent;
  if (!curBorrowShare.isAwareApprove) {
    awareContent = (
      <button
        id="outPostItem-awareApproveBtn-react"
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
          "You've received. "
        )}
      </button>
    );
  } else {
    awareContent = <span>You've received.</span>;
  }
  const returnContent = (
    <button
      id="outPostItem-returnBtn-react"
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

  return (
    <div className="text-success">
      {"Your request is approved. "}
      {awareContent}
      {returnContent}
    </div>
  );
}

InPostItemFootingApprove.propTypes = {
  // postId: PropTypes.string.isRequired,
  // loginUser: PropTypes.instanceOf(User).isRequired,
  // isActive: PropTypes.bool.isRequired,
  curBorrowShare: nullOrRequiredValidator("object", Share),
  // myRequestShare: nullOrRequiredValidator("object", Share),
  // isRequestingPost: PropTypes.bool.isRequired,
  // isDeleteingShare: PropTypes.bool.isRequired,
  isAwaringShare: PropTypes.bool.isRequired,
  isReturningShare: PropTypes.bool.isRequired,
  // onCreateShare: PropTypes.func.isRequired,
  // onDeleteShare: PropTypes.func.isRequired,
  onAwareShare: PropTypes.func.isRequired,
  onReturnShare: PropTypes.func.isRequired
};
export { InPostItemFootingApprove };
