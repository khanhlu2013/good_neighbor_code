import React from "react";
import PropTypes from "prop-types";

import PostItemStyle from "../../post/style/postItem_style";
import PostItemBodyWebView from "../../post/view/postItem_body.webView";
import InPostItemHeadWebView from "./inPostItem_head.webView";
import InPostItemFootWebView from "./foot/inPostItem_foot.webView";
import PostItemFootWebStyle from "../../post/style/postItemFoot.webStyle";
import InPostItemFootController from "@gn/common/bus/inPost/controller/foot/inPostItem_foot.controller";

function InPostItemWebView(props) {
  const { post } = props;

  return (
    <PostItemStyle id="inPost-item-react">
      <InPostItemHeadWebView
        postUserName={post.user.name}
        postUserEmail={post.user.email}
        dateCreate={post.dateCreate}
      />
      <PostItemBodyWebView post={post} />

      <PostItemFootWebStyle>
        <InPostItemFootController
          postId={post.id}
          view={InPostItemFootWebView}
        />
      </PostItemFootWebStyle>
    </PostItemStyle>
  );
}
InPostItemWebView.propTypes = {
  post: PropTypes.object.isRequired
};

export default InPostItemWebView;
