import React from "react";
import PropTypes from "prop-types";
import className from "classnames";

import { LoadingIcon } from "../../util";

function InPostItemFootingShop(props) {
  const { postId, isRequestingPost, onCreateShare } = props;

  const onCreateShareClicked = e => {
    onCreateShare(postId);
  };

  return (
    <button
      id="outPostItem-requestBtn-react"
      className={className({
        btn: true,
        "btn-success": !isRequestingPost,
        "btn-secondary": isRequestingPost,
        disabled: isRequestingPost
      })}
      onClick={onCreateShareClicked}
    >
      {isRequestingPost ? (
        <LoadingIcon text="requesting" isAnimate={true} />
      ) : (
        "request"
      )}
    </button>
  );
}

InPostItemFootingShop.propTypes = {
  postId: PropTypes.string.isRequired,
  isRequestingPost: PropTypes.bool.isRequired,
  onCreateShare: PropTypes.func.isRequired
};
export { InPostItemFootingShop };
