import React from "react";
import PropTypes from "prop-types";
import PostItemFootStyle from "../../../post/component/style/postItem_foot_style";
import InPostItemFootBorrowContainer from "../container/inPostItem_foot_borrow.con";
import InPostItemFootRequestContainer from "../container/inPostItem_foot_request.con";
import InPostItemFootShopContainer from "../container/inPostItem_foot_shop.con";
import Post from "../../../../model/post";

function InPostItemFoot(props) {
  const { post, loginUserId } = props;

  //myBorrowShare
  const curBorrowShare = post.curBorrowShare;
  let myBorrowShare = null;
  if (curBorrowShare && curBorrowShare.borrower.id === loginUserId) {
    myBorrowShare = curBorrowShare;
  }

  //myRequestShare
  const myRequestShare =
    post.requestShares.find(share => share.borrower.id === loginUserId) || null;

  let content;

  if (myRequestShare) {
    content = (
      <InPostItemFootRequestContainer myRequestShareId={myRequestShare.id} />
    );
  } else if (myBorrowShare) {
    content = (
      <InPostItemFootBorrowContainer myBorrowShareId={myBorrowShare.id} />
    );
  } else if (post.isActive) {
    content = <InPostItemFootShopContainer postId={post.id} />;
  } else {
    content = <div>Post is no longer active</div>;
  }

  return <PostItemFootStyle>{content}</PostItemFootStyle>;
}
InPostItemFoot.propTypes = {
  post: PropTypes.instanceOf(Post).isRequired,
  loginUserId: PropTypes.string.isRequired
};

export default InPostItemFoot;
