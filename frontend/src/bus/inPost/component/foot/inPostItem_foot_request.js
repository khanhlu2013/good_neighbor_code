import React from "react";
import PropTypes from "prop-types";
import LoadingIcon from "../../../../share/loadingIcon";

function InPostItemFootRequest(props) {
  const { requestShareId, isDeleteingShare, onUnRequestPost } = props;

  const onUndoRequestClicked = e => {
    onUnRequestPost(requestShareId);
  };

  let content;
  if (isDeleteingShare) {
    content = <LoadingIcon text="undo" />;
  } else {
    content = (
      <button
        id="outPostItem-undoRequestBtn-react"
        onClick={onUndoRequestClicked}
        className="btn btn-warning"
      >
        undo
      </button>
    );
  }

  return (
    <div className="text-success">
      <span className="mr-1">you're in the waiting list.</span>
      {content}
    </div>
  );
}

InPostItemFootRequest.propTypes = {
  requestShareId: PropTypes.string.isRequired,
  isDeleteingShare: PropTypes.bool.isRequired,
  onUnRequestPost: PropTypes.func.isRequired
};
export default InPostItemFootRequest;
