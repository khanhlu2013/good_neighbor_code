import React from "react";
import styled from "styled-components";
import { View, Text } from "react-native";

import PostItemBodyMixin from "../../../common/bus/post/style/postItemBody.mixin";
import PostItemBodyViewPropTypes from "../../../common/bus/post/viewPropTypes/postItemBody.view.propTypes";

const Style = styled.View`
  ${PostItemBodyMixin}
`;

function PostItemBodyMobileView(props) {
  const { post } = props;
  const { title, description } = post;
  const curBorrowShare = post.curBorrowShare;
  const borrower = curBorrowShare ? curBorrowShare.borrower : null;

  return (
    <Style>
      <View>
        <Text>title: {title}</Text>
      </View>
      <View>
        <Text>description: {description}</Text>
      </View>
      {borrower && (
        <View>
          <Text>borrowing by: {borrower.getNameAndEmail()}</Text>
        </View>
      )}
    </Style>
  );
}
PostItemBodyMobileView.propTypes = PostItemBodyViewPropTypes;

export default PostItemBodyMobileView;