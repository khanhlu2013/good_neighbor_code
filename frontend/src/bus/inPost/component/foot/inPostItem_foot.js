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
  const { postId, isActive, myBorrowShare, myRequestShareId } = props;

  let content;

  if (myRequestShareId) {
    content = (
      <InPostItemFootRequestContainer requestShareId={myRequestShareId} />
    );
  } else if (myBorrowShare) {
    content = <InPostItemFootApproveContainer approveShare={myBorrowShare} />;
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
  myBorrowShare: nullOrRequiredValidator("object", Share),
  myRequestShareId: nullOrRequiredValidator("string")
};

export default InPostItemFoot;
