import React from "react";
import { Button } from "react-native";
import LoadingIconMobileView from "../../../../share/LoadingIcon.mobileView";
import InPostItemFootShopViewPropType from "@gn/common/bus/inPost/propType/foot/inPostItem_foot_shop.view.propType";

function InPostItemFootShopMobileView(props) {
  const { postId, isRequestingPost, onRequestPost } = props;

  const onRequestPostClick = e => {
    onRequestPost(postId);
  };

  let content;
  if (isRequestingPost) {
    content = <LoadingIconMobileView text="requesting" />;
  } else {
    content = <Button title="request" onPress={onRequestPostClick} />;
  }
  return content;
}

InPostItemFootShopMobileView.propTypes = InPostItemFootShopViewPropType;
export default InPostItemFootShopMobileView;
