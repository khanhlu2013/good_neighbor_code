import React from "react";
import PropTypes from "prop-types";

import InPostItemHead from "./inPostItem_head";
import InPostItemFootContainer from "../container/foot/inPostItem_foot.con";
import PostItemStyle from "../../post/style/postItem_style";
import PostItemBodyWebView from "../../post/view/postItem_body.webView";

function InPostItem(props) {
  const { post } = props;

  return (
    <PostItemStyle id="inPost-item-react">
      <InPostItemHead
        postUserName={post.user.name}
        postUserEmail={post.user.email}
        dateCreate={post.dateCreate}
      />
      <PostItemBodyWebView post={post} />
      <InPostItemFootContainer postId={post.id} />
    </PostItemStyle>
  );
}
InPostItem.propTypes = {
  post: PropTypes.object.isRequired
};

export { InPostItem };
