import React from "react";
import PropTypes from "prop-types";
import { LoadingIcon } from "../../componentUi/loadingIcon";

function InPostItemFootShop(props) {
  const { postId, isRequestingPost, onRequestPost } = props;

  const onRequestPostClicked = e => {
    onRequestPost(postId);
  };

  let content;
  if (isRequestingPost) {
    content = <LoadingIcon text="requesting" />;
  } else {
    content = (
      <button
        id="outPostItem-requestBtn-react"
        className="btn btn-success"
        onClick={onRequestPostClicked}
      >
        request
      </button>
    );
  }
  return content;
}

InPostItemFootShop.propTypes = {
  postId: PropTypes.string.isRequired,
  isRequestingPost: PropTypes.bool.isRequired,
  onRequestPost: PropTypes.func.isRequired
};
export { InPostItemFootShop };
