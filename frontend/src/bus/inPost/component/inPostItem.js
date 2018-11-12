import React from "react";
import PropTypes from "prop-types";

import PostItemBody from "../../post/component/postItem_body";
import PostItemStyle from "../../post/component/style/postItem_style";
import InPostItemHead from "./inPostItem_head";
import InPostItemFootContainer from "../container/foot/inPostItem_foot.con";

function InPostItem(props) {
  const { post } = props;

  return (
    <PostItemStyle id="inPost-item-react">
      <InPostItemHead postUser={post.user} dateCreate={post.dateCreate} />
      <PostItemBody post={post} />
      <InPostItemFootContainer postId={post.id} />
    </PostItemStyle>
  );
}
InPostItem.propTypes = {
  post: PropTypes.object.isRequired
};

export { InPostItem };
