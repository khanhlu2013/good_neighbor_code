import React from "react";
import styled from "styled-components";
import { View, Text } from "react-native";

import PostItemBodyMixin from "../../../common/bus/post/style/postItemBody.mixin";
import PostItemBodyViewPropType from "../../../common/bus/post/propType/postItemBody.view.propType";
import PostItemRequestListMobileView from "./postItem_requestList.mobileView";
import PostItemHistoryListMobileView from "./postItem_historyList.mobileView";
import PostItemHistoryListController from "../../../common/bus/post/controller/postItem_historyList.controller";
import PostItemRequestListController from "../../../common/bus/post/controller/postItem_requestList.controller";

const Style = styled.View`
  ${PostItemBodyMixin}
`;

const PostItemRequestListStyle = styled.View`
  margin-top: 10px;
`;
const PostItemHistoryListStyle = styled.View`
  margin-top: 10px;
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

      {post.requestShares.length !== 0 && (
        <PostItemRequestListStyle>
          <PostItemRequestListController
            shares={post.requestShares}
            view={PostItemRequestListMobileView}
          />
        </PostItemRequestListStyle>
      )}

      {post.returnShares.length !== 0 && (
        <PostItemHistoryListStyle>
          <PostItemHistoryListController
            shares={post.returnShares}
            view={PostItemHistoryListMobileView}
          />
        </PostItemHistoryListStyle>
      )}
    </Style>
  );
}
PostItemBodyMobileView.propTypes = PostItemBodyViewPropType;

export default PostItemBodyMobileView;
