import React from "react";
import PropTypes from "prop-types";
import User from "../../../../model/user";
import Share from "../../../../model/share";
import PostItemFootStyle from "../../../post/component/style/postItem_foot_style";
import { nullOrRequiredValidator } from "../../../../share/util";
import InPostItemFootRequestContainer from "../../container/foot/inPostItem_foot_request.con";
import InPostItemFootApproveContainer from "../../container/foot/inPostItem_foot_approve.con";
import InPostItemFootShopContainer from "../../container/foot/inPostItem_foot_shop.con";

function InPostItemFoot(props) {
  const {
    postId,
    loginUser,
    isActive,
    currentlyBorrowShare,
    myRequestShare
  } = props;

  let content;

  if (myRequestShare) {
    content = (
      <InPostItemFootRequestContainer requestShareId={myRequestShare.id} />
    );
  } else if (
    currentlyBorrowShare !== null &&
    currentlyBorrowShare.borrower.id === loginUser.id
  ) {
    content = (
      <InPostItemFootApproveContainer approveShare={currentlyBorrowShare} />
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
  loginUser: PropTypes.instanceOf(User).isRequired,
  isActive: PropTypes.bool.isRequired,
  currentlyBorrowShare: nullOrRequiredValidator("object", Share),
  myRequestShare: nullOrRequiredValidator("object", Share)
};

export default InPostItemFoot;
