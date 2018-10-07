import React from "react";
import PropTypes from "prop-types";
import { LoadingIcon } from "../../util/loadingIcon";

function InPostItemFootingShop(props) {
  const { postId, isRequestingPost, onCreateShare } = props;

  const onCreateShareClicked = e => {
    onCreateShare(postId);
  };

  let content;
  if (isRequestingPost) {
    content = <LoadingIcon text="requesting" />;
  } else {
    content = (
      <button
        id="outPostItem-requestBtn-react"
        className="btn btn-success"
        onClick={onCreateShareClicked}
      >
        request
      </button>
    );
  }
  return content;
}

InPostItemFootingShop.propTypes = {
  postId: PropTypes.string.isRequired,
  isRequestingPost: PropTypes.bool.isRequired,
  onCreateShare: PropTypes.func.isRequired
};
export { InPostItemFootingShop };
