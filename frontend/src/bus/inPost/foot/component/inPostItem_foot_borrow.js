import React from "react";
import PropTypes from "prop-types";

import LoadingIcon from "../../../../share/loadingIcon";
import Share from "../../../../model/share";

function InPostItemFootBorrow(props) {
  const {
    myBorrowShare,
    isAwaringShare,
    isReturningShare,
    onAwareApprovePost,
    onReturnPost
  } = props;

  const onAwareApprovePostClick = e => {
    onAwareApprovePost(myBorrowShare.id);
  };
  const onReturnPostClick = e => {
    onReturnPost(myBorrowShare.id);
  };

  let awareContent;
  if (!myBorrowShare.isAwareApprove) {
    if (isAwaringShare) {
      awareContent = <LoadingIcon text={"aware approve"} />;
    } else {
      awareContent = (
        <button
          id="outPostItem-awareApproveBtn-react"
          className="btn btn-sm btn-success"
          onClick={onAwareApprovePostClick}
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
    returnContent = <LoadingIcon text={"return"} />;
  } else {
    returnContent = (
      <button
        id="outPostItem-returnBtn-react"
        className="btn btn-sm btn-warning ml-1"
        onClick={onReturnPostClick}
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

InPostItemFootBorrow.propTypes = {
  myBorrowShare: PropTypes.instanceOf(Share).isRequired,
  isAwaringShare: PropTypes.bool.isRequired,
  isReturningShare: PropTypes.bool.isRequired,
  onAwareApprovePost: PropTypes.func.isRequired,
  onReturnPost: PropTypes.func.isRequired
};
export default InPostItemFootBorrow;
