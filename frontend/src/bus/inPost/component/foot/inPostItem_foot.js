import React from "react";
import PropTypes from "prop-types";
import PostItemFootStyle from "../../../post/component/style/postItem_foot_style";
import { nullOrRequiredValidator } from "../../../../share/util";
import InPostItemFootRequestContainer from "../../container/foot/inPostItem_foot_request.con";
import InPostItemFootApproveContainer from "../../container/foot/inPostItem_foot_approve.con";
import InPostItemFootShopContainer from "../../container/foot/inPostItem_foot_shop.con";

function InPostItemFoot(props) {
  const { postId, isActive, myBorrowShareId, myRequestShareId } = props;

  let content;

  if (myRequestShareId) {
    content = (
      <InPostItemFootRequestContainer myRequestShareId={myRequestShareId} />
    );
  } else if (myBorrowShareId) {
    content = (
      <InPostItemFootApproveContainer myBorrowShareId={myBorrowShareId} />
    );
  } else if (isActive) {
    content = <InPostItemFootShopContainer postId={postId} />;
  } else {
    content = <div>Post is no longer active</div>;
  }

  return <PostItemFootStyle>{content}</PostItemFootStyle>;
}
InPostItemFoot.propTypes = {
  postId: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  myBorrowShareId: nullOrRequiredValidator("string"),
  myRequestShareId: nullOrRequiredValidator("string")
};

export default InPostItemFoot;
