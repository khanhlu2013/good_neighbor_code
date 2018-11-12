import React from "react";
import PropTypes from "prop-types";

import Share from "../../../../model/share";
import LoadingIcon from "../../../../share/loadingIcon";

function InPostItemFootApprove(props) {
  const {
    approveShare,
    isAwaringShare,
    isReturningShare,
    onAwareApprovePost,
    onReturnPost
  } = props;

  const onAwareShareClicked = e => {
    onAwareApprovePost(approveShare.id);
  };
  const onReturnShareClicked = e => {
    onReturnPost(approveShare.id);
  };

  let awareContent;
  if (!approveShare.isAwareApprove) {
    if (isAwaringShare) {
      awareContent = <LoadingIcon text={"aware approve"} />;
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
    returnContent = <LoadingIcon text={"return"} />;
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
  approveShare: PropTypes.instanceOf(Share).isRequired,
  isAwaringShare: PropTypes.bool.isRequired,
  isReturningShare: PropTypes.bool.isRequired,
  onAwareApprovePost: PropTypes.func.isRequired,
  onReturnPost: PropTypes.func.isRequired
};
export default InPostItemFootApprove;
