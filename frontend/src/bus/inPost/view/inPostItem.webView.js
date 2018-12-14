import React from "react";
import PropTypes from "prop-types";

import InPostItemFootContainer from "../container/foot/inPostItem_foot.con";
import PostItemStyle from "../../post/style/postItem_style";
import PostItemBodyWebView from "../../post/view/postItem_body.webView";
import InPostItemHeadWebView from "./inPostItem_head.webView";

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
      <InPostItemFootContainer postId={post.id} />
    </PostItemStyle>
  );
}
InPostItemWebView.propTypes = {
  post: PropTypes.object.isRequired
};

export default InPostItemWebView;
