import React from "react";
import PropTypes from "prop-types";
import LoadingIcon from "../../../../share/loadingIcon";

function InPostItemFootBorrowWebView(props) {
  const {
    myBorrowShareId,
    isAwareApproveBorrowShare,
    isAwaringShare,
    isReturningShare,
    onAwareApprovePost,
    onReturnPost
  } = props;

  const onAwareApprovePostClick = e => {
    onAwareApprovePost(myBorrowShareId);
  };
  const onReturnPostClick = e => {
    // this confirm need to be handle in unit test with jest, thus i am delay this
    // if (
    //   !window.confirm(`You are returning '${postTitle}'. This can not be undo!`)
    // ) {
    //   return;
    // }
    onReturnPost(myBorrowShareId);
  };

  let awareContent;
  if (!isAwareApproveBorrowShare) {
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

InPostItemFootBorrowWebView.propTypes = {
  myBorrowShareId: PropTypes.string.isRequired,
  isAwareApproveBorrowShare: PropTypes.bool.isRequired,
  isAwaringShare: PropTypes.bool.isRequired,
  isReturningShare: PropTypes.bool.isRequired,
  onAwareApprovePost: PropTypes.func.isRequired,
  onReturnPost: PropTypes.func.isRequired
};
export default InPostItemFootBorrowWebView;
