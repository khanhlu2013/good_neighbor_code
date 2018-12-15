import React from "react";
import PropTypes from "prop-types";
import LoadingIcon from "../../../../share/loadingIcon";

function InPostItemFootShopWebView(props) {
  const { postId, isRequestingPost, onRequestPost } = props;

  const onRequestPostClick = e => {
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
        onClick={onRequestPostClick}
      >
        request
      </button>
    );
  }
  return content;
}

InPostItemFootShopWebView.propTypes = {
  postId: PropTypes.string.isRequired,
  isRequestingPost: PropTypes.bool.isRequired,
  onRequestPost: PropTypes.func.isRequired
};
export default InPostItemFootShopWebView;
