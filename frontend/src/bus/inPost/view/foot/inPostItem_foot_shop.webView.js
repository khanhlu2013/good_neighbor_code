import React from "react";
import LoadingIcon from "../../../../share/loadingIcon";
import InPostItemFootShopViewPropType from "@gn/common/bus/inPost/propType/foot/inPostItem_foot_shop.view.propType";

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

InPostItemFootShopWebView.propTypes = InPostItemFootShopViewPropType;
export default InPostItemFootShopWebView;
