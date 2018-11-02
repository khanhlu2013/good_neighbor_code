import React from "react";
import PropTypes from "prop-types";

import Share from "../../../../model/share";
import LoadingIcon from "../../../../share/loadingIcon";

function InPostItemFootApprove(props) {
  const {
    curBorrowShare,
    isAwaringShare,
    isReturningShare,
    onAwareApprovePost,
    onReturnPost
  } = props;

  const onAwareShareClicked = e => {
    onAwareApprovePost(curBorrowShare.id);
  };
  const onReturnShareClicked = e => {
    onReturnPost(curBorrowShare.id);
  };

  let awareContent;
  if (!curBorrowShare.isAwareApprove) {
    if (isAwaringShare) {
      awareContent = <LoadingIcon text={"receiving"} />;
    } else {
      awareContent = (
        <button
          id="outPostItem-awareApproveBtn-react"
          className="btn btn-sm btn-success"
          onClick={onAwareShareClicked}
        >
          confirm approved
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
        className="btn btn-sm btn-warning ml-1"
        onClick={onReturnShareClicked}
      >
        return item
      </button>
    );
  }
  return (
    <div className="text-success">
      {"request approved."}
      <span className="ml-1">{awareContent}</span>
      {returnContent}
    </div>
  );
}

InPostItemFootApprove.propTypes = {
  curBorrowShare: PropTypes.instanceOf(Share).isRequired,
  isAwaringShare: PropTypes.bool.isRequired,
  isReturningShare: PropTypes.bool.isRequired,
  onAwareApprovePost: PropTypes.func.isRequired,
  onReturnPost: PropTypes.func.isRequired
};
export default InPostItemFootApprove;
