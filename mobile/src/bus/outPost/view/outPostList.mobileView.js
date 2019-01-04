import React from "react";
import { FlatList, View, Text } from "react-native";

import PostListNoDataMobileView from "../../post/view/postListNoData.mobileView";
import OutPostItemMobileView from "./outPostItem.mobileView";

function OutPostListMobileView(props) {
  const {
    listId,
    posts,
    onUpdatePostClick,
    onDecidePostClick,
    onAwareReturnPost,
    awaringReturnPostIds
  } = props;

  let content;
  if (posts.length === 0) {
    content = <PostListNoDataMobileView />;
  } else {
    content = (
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({ item: post }) => (
          <OutPostItemMobileView
            post={post}
            onUpdatePostClick={onUpdatePostClick}
            onDecidePostClick={onDecidePostClick}
            onAwareReturnPost={onAwareReturnPost}
            isAwaringReturn={awaringReturnPostIds.includes(post.id)}
          />
        )}
      />
    );
  }

  return <View id={listId}>{content}</View>;
}
export default OutPostListMobileView;
