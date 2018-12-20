import React from "react";
import { View, FlatList } from "react-native";
import styled from "styled-components";

import InPostItemMobileView from "./inPostItem.mobileView";
import PostListNoDataMobileView from "../../post/view/postListNoData.mobileView";
import InPostListController from "../../../common/bus/inPost/controller/inPostList.controller";
import InPostListViewPropType from "../../../common/bus/inPost/propType/inPostList.view.propType";

function InPostListMobileView(props) {
  const { listId, posts } = props;
  return (
    <View id={listId}>
      <InPostListController
        posts={posts}
        renderProp={_renderProp}
        inPostItemView={InPostItemMobileView}
        noInPostDataIndicatorView={PostListNoDataMobileView}
      />
    </View>
  );
}
InPostListMobileView.propTypes = InPostListViewPropType;

export default InPostListMobileView;
const Style = styled.View`
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
`;
function _renderProp(posts) {
  let content;
  if (posts.length === 0) {
    content = <PostListNoDataMobileView />;
  } else {
    content = (
      <FlatList
        data={posts}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item }) => (
          <Style>
            <InPostItemMobileView post={item} />
          </Style>
        )}
      />
    );
  }
  return content;
}
