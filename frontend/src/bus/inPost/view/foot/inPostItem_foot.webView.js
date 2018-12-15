import React from "react";
import PropTypes from "prop-types";
import { nullOrRequiredValidator } from "@gn/common/util";
import InPostItemFootShopContainer from "../../container/foot/inPostItem_foot_shop.con";
import InPostItemFootBorrowContainer from "../../container/foot/inPostItem_foot_borrow.con";
import InPostItemFootRequestContainer from "../../container/foot/inPostItem_foot_request.con";
import PostItemFootStyle from "../../../post/style/postItem_foot_style";

function InPostItemFootWebView(props) {
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
InPostItemFootWebView.propTypes = {
  postId: PropTypes.string.isRequired,
  myRequestShareId: nullOrRequiredValidator("string"),
  myBorrowShareId: nullOrRequiredValidator("string"),
  isActivePost: PropTypes.bool.isRequired
};

export default InPostItemFootWebView;
