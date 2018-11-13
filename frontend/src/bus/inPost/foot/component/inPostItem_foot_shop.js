import React from "react";
import PropTypes from "prop-types";

import LoadingIcon from "../../../../share/loadingIcon";

function InPostItemFootShop(props) {
  const { postId, isRequestingPost, requestPostHandler } = props;

  const requestPostClickHandler = e => {
    requestPostHandler(postId);
  };

  let content;
  if (isRequestingPost) {
    content = <LoadingIcon text="requesting" />;
  } else {
    content = (
      <button
        id="outPostItem-requestBtn-react"
        className="btn btn-success"
        onClick={requestPostClickHandler}
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
  requestPostHandler: PropTypes.func.isRequired
};
export default InPostItemFootShop;
