import React from "react";
import PropTypes from "prop-types";
import className from "classnames";

import { LoadingIcon } from "../../util";

function InPostItemFootingRequest(props) {
  const { myRequestShareId, isDeleteingShare, onDeleteShare } = props;

  const onUndoRequestClicked = e => {
    onDeleteShare(myRequestShareId);
  };

  return (
    <div className="text-success">
      You are in the waiting list. Please wait for response.
      <button
        onClick={onUndoRequestClicked}
        className={className({
          btn: true,
          "btn-warning": !isDeleteingShare,
          "btn-secondary": isDeleteingShare
        })}
      >
        {isDeleteingShare ? (
          <LoadingIcon text="undo" isAnimate={true} />
        ) : (
          "undo"
        )}
      </button>
    </div>
  );
}

InPostItemFootingRequest.propTypes = {
  myRequestShareId: PropTypes.string.isRequired,
  isDeleteingShare: PropTypes.bool.isRequired,
  onDeleteShare: PropTypes.func.isRequired
};
export { InPostItemFootingRequest };
