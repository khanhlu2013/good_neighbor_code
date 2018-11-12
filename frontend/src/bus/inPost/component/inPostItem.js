import React from "react";
import PropTypes from "prop-types";

import PostItemBody from "../../post/component/postItem_body";
import InPostItemFoot from "./foot/inPostItem_foot";
import PostItemStyle from "../../post/component/style/postItem_style";
import InPostItemHead from "./inPostItem_head";

function InPostItem(props) {
  const { loginUser, post } = props;
  const myRequestShare =
    post.requestShares.find(share => share.borrower.id === loginUser.id) ||
    null;

  return (
    <PostItemStyle id="inPost-item-react">
      <InPostItemHead postUser={post.user} dateCreate={post.dateCreate} />
      <PostItemBody post={post} />
      <InPostItemFoot
        postId={post.id}
        loginUser={loginUser}
        isActive={post.isActive}
        currentlyBorrowShare={post.curBorrowShare}
        myRequestShare={myRequestShare}
      />
    </PostItemStyle>
  );
}
InPostItem.propTypes = {
  loginUser: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

export { InPostItem };
