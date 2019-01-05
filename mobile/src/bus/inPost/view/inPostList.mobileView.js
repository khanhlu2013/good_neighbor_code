import React from "react";
import { View, FlatList } from "react-native";

import InPostItemMobileView from "./inPostItem.mobileView";
import PostListNoDataMobileView from "../../post/view/postListNoData.mobileView";
import InPostListController from "@gn/common/bus/inPost/controller/inPostList.controller";
import InPostListViewPropType from "@gn/common/bus/inPost/propType/inPostList.view.propType";

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

function _renderProp(posts) {
  let content;
  if (posts.length === 0) {
    content = <PostListNoDataMobileView />;
  } else {
    content = (
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <InPostItemMobileView post={item} />}
      />
    );
  }
  return content;
}
