import React from "react";
import PropTypes from "prop-types";

import { LoadingIcon } from "../../util";

function InPostItemFootingRequest(props) {
  const { myRequestShareId, isDeleteingShare, onDeleteShare } = props;

  const onUndoRequestClicked = e => {
    onDeleteShare(myRequestShareId);
  };

  let content;
  if (isDeleteingShare) {
    content = <LoadingIcon text="undo" isAnimate={true} />;
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
      you're in waiting list, please wait for response.
      {content}
    </div>
  );
}

InPostItemFootingRequest.propTypes = {
  myRequestShareId: PropTypes.string.isRequired,
  isDeleteingShare: PropTypes.bool.isRequired,
  onDeleteShare: PropTypes.func.isRequired
};
export { InPostItemFootingRequest };
