import React from "react";
import PropTypes from "prop-types";
import Post from "../../../common/model/post";
import InPostItemHeadMobileView from "./inPostItem_head.mobileView";
import PostItemStyle from "../../post/style/postItem_style";
import PostItemBodyMobileView from "../../post/view/postItem_body.mobileView";

function InPostItemMobileView(props) {
  const { post } = props;
  const { user, dateCreate } = post;
  const { name, email } = user;

  return (
    <PostItemStyle>
      <InPostItemHeadMobileView
        postUserName={name}
        postUserEmail={email}
        dateCreate={dateCreate}
      />
      <PostItemBodyMobileView post={post} />
    </PostItemStyle>
  );
}
InPostItemMobileView.propTypes = {
  post: PropTypes.instanceOf(Post).isRequired
};

export default InPostItemMobileView;
