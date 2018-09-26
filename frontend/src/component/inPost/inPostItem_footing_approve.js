import React from "react";
import PropTypes from "prop-types";
import className from "classnames";

import { LoadingIcon } from "../../util";
import { Share } from "../../model/share";

function InPostItemFootingApprove(props) {
  const {
    curBorrowShare,
    isAwaringShare,
    isReturningShare,
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
  curBorrowShare: PropTypes.instanceOf(Share).isRequired,
  isAwaringShare: PropTypes.bool.isRequired,
  isReturningShare: PropTypes.bool.isRequired,
  onAwareShare: PropTypes.func.isRequired,
  onReturnShare: PropTypes.func.isRequired
};
export { InPostItemFootingApprove };
