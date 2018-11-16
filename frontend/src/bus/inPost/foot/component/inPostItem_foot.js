import React from "react";
import PropTypes from "prop-types";
import PostItemFootStyle from "../../../post/component/style/postItem_foot_style";
import InPostItemFootBorrowContainer from "../container/inPostItem_foot_borrow.con";
import InPostItemFootRequestContainer from "../container/inPostItem_foot_request.con";
import InPostItemFootShopContainer from "../container/inPostItem_foot_shop.con";
import { nullOrRequiredValidator } from "../../../../share/util";

function InPostItemFoot(props) {
  const { postId, myRequestShareId, myBorrowShareId, isActivePost } = props;

  let content;

  if (myRequestShareId) {
    content = (
      <InPostItemFootRequestContainer myRequestShareId={myRequestShareId} />
    );
  } else if (myBorrowShareId) {
    content = (
      <InPostItemFootBorrowContainer myBorrowShareId={myBorrowShareId} />
    );
  } else if (isActivePost) {
    content = <InPostItemFootShopContainer postId={postId} />;
  } else {
    content = <div>Post is no longer active</div>;
  }

  return <PostItemFootStyle>{content}</PostItemFootStyle>;
}
InPostItemFoot.propTypes = {
  postId: PropTypes.string.isRequired,
  myRequestShareId: nullOrRequiredValidator("string"),
  myBorrowShareId: nullOrRequiredValidator("string"),
  isActivePost: PropTypes.bool.isRequired
};

export default InPostItemFoot;
