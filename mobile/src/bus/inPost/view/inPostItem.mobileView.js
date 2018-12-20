import React from "react";
import PropTypes from "prop-types";
import Post from "../../../common/model/post";
import InPostItemHeadMobileView from "./inPostItem_head.mobileView";
import PostItemBodyMobileView from "../../post/view/postItem_body.mobileView";
import InPostItemFootController from "../../../common/bus/inPost/controller/foot/inPostItem_foot.controller";
import InPostItemFootMobileView from "./foot/inPostItem_foot.mobileView";
import PostItemFootMobileStyle from "../../post/style/postItem_foot.mobileStyle";
import PostItemStyle from "../../post/style/postItem_style";

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

      <PostItemFootMobileStyle>
        <InPostItemFootController
          postId={post.id}
          view={InPostItemFootMobileView}
        />
      </PostItemFootMobileStyle>
    </PostItemStyle>
  );
}
InPostItemMobileView.propTypes = {
  post: PropTypes.instanceOf(Post).isRequired
};

export default InPostItemMobileView;
