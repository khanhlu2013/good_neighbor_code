import React from "react";
import PropTypes from "prop-types";
import { nullOrRequiredValidator } from "@gn/common/util";
import PostItemFootStyle from "../../../post/style/postItem_foot_style";
import InPostItemFootShopWebView from "./inPostItem_foot_shop.webView";
import InPostItemFootRequestController from "@gn/common/bus/inPost/controller/foot/inPostItem_foot_request.controller";
import InPostItemFootRequestWebView from "./inPostItem_foot_request.webView";
import InPostItemFootBorrowController from "@gn/common/bus/inPost/controller/foot/inPostItem_foot_borrow.controller";
import InPostItemFootBorrowWebView from "./inPostItem_foot_borrow.webView";
import InPostItemFootShopController from "@gn/common/bus/inPost/controller/foot/inPostItem_foot_shop.controller";

function InPostItemFootWebView(props) {
  const { postId, myRequestShareId, myBorrowShareId, isActivePost } = props;

  let content;

  if (myRequestShareId) {
    content = (
      <InPostItemFootRequestController
        myRequestShareId={myRequestShareId}
        view={InPostItemFootRequestWebView}
      />
    );
  } else if (myBorrowShareId) {
    content = (
      <InPostItemFootBorrowController
        myBorrowShareId={myBorrowShareId}
        view={InPostItemFootBorrowWebView}
      />
    );
  } else if (isActivePost) {
    content = (
      <InPostItemFootShopController
        postId={postId}
        view={InPostItemFootShopWebView}
      />
    );
  } else {
    content = <div>Post is no longer active</div>;
  }

  return <PostItemFootStyle>{content}</PostItemFootStyle>;
}
InPostItemFootWebView.propTypes = {
  postId: PropTypes.string.isRequired,
  myRequestShareId: nullOrRequiredValidator("string"),
  myBorrowShareId: nullOrRequiredValidator("string"),
  isActivePost: PropTypes.bool.isRequired
};

export default InPostItemFootWebView;
