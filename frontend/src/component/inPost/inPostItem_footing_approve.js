import React from "react";
import PropTypes from "prop-types";

import { Share } from "../../model/share";
import { LoadingIcon } from "../../util/loadingIcon";

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
    if (isAwaringShare) {
      awareContent = <LoadingIcon text={"receiving"} />;
    } else {
      awareContent = (
        <button
          id="outPostItem-awareApproveBtn-react"
          className="btn btn-success"
          onClick={onAwareShareClicked}
        >
          confirm received
        </button>
      );
    }
  } else {
    awareContent = <span>You've received.</span>;
  }
  let returnContent;
  if (isReturningShare) {
    returnContent = <LoadingIcon text={"returning"} />;
  } else {
    returnContent = (
      <button
        id="outPostItem-returnBtn-react"
        className="btn btn-warning"
        onClick={onReturnShareClicked}
      >
        return
      </button>
    );
  }
  return (
    <div className="text-success">
      {"your request is approved."}
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
