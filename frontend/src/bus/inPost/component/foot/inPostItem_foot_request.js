import React from "react";
import PropTypes from "prop-types";
import LoadingIcon from "../../../../share/loadingIcon";

function InPostItemFootRequest(props) {
  const { myRequestShareId, isUnRequestingPost, onUnRequestPost } = props;

  const handleUndoRequest = e => {
    onUnRequestPost(myRequestShareId);
  };

  let content;
  if (isUnRequestingPost) {
    content = <LoadingIcon text="undo" />;
  } else {
    content = (
      <button
        id="outPostItem-undoRequestBtn-react"
        onClick={handleUndoRequest}
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
  myRequestShareId: PropTypes.string.isRequired,
  isUnRequestingPost: PropTypes.bool.isRequired,
  onUnRequestPost: PropTypes.func.isRequired
};
export default InPostItemFootRequest;
