import React from "react";
import InPostItemFootShopWebView from "./inPostItem_foot_shop.webView";
import InPostItemFootRequestController from "@gn/common/bus/inPost/controller/foot/inPostItem_foot_request.controller";
import InPostItemFootRequestWebView from "./inPostItem_foot_request.webView";
import InPostItemFootBorrowController from "@gn/common/bus/inPost/controller/foot/inPostItem_foot_borrow.controller";
import InPostItemFootBorrowWebView from "./inPostItem_foot_borrow.webView";
import InPostItemFootViewPropType from "@gn/common/bus/inPost/propType/foot/inPostItem_foot.view.propType";
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

  return content;
}
InPostItemFootWebView.propTypes = InPostItemFootViewPropType;

export default InPostItemFootWebView;
