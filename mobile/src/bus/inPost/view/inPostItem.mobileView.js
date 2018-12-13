import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import Post from "../../../common/model/post";
import InPostItemHeadMobileView from "./inPostItem_head.mobileView";
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
      <Text>{post.title}</Text>
    </PostItemStyle>
  );
}
InPostItemMobileView.propTypes = {
  post: PropTypes.instanceOf(Post).isRequired
};

export default InPostItemMobileView;
