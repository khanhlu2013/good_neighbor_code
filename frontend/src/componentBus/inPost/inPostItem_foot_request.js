import React from "react";
import PropTypes from "prop-types";
import { LoadingIcon } from "../../util/loadingIcon";

function InPostItemFootRequest(props) {
  const { myRequestShareId, isDeleteingShare, onDeleteShare } = props;

  const onUndoRequestClicked = e => {
    onDeleteShare(myRequestShareId);
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
  myRequestShareId: PropTypes.string.isRequired,
  isDeleteingShare: PropTypes.bool.isRequired,
  onDeleteShare: PropTypes.func.isRequired
};
export { InPostItemFootRequest };
