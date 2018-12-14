import React from "react";

import InPostItemWebView from "./inPostItem.webView";
import PostListNoDataWebView from "../../post/view/postListNoData.webView";
import InPostListViewPropTypes from "@gn/common/bus/inPost/viewPropTypes/inPostListView.propTypes";
import InPostListController from "@gn/common/bus/inPost/controller/inPostList.controller";

function InPostListWebView(props) {
  const { listId, posts } = props;
  return (
    <div id={listId}>
      <InPostListController
        posts={posts}
        inPostItemView={InPostItemWebView}
        noInPostDataIndicatorView={PostListNoDataWebView}
      />
    </div>
  );
}
InPostListWebView.propTypes = InPostListViewPropTypes;

export default InPostListWebView;
