import React from "react";
import { FlatList, View, Text } from "react-native";

import OutPostListPropType from "../../common/bus/outPost/propType/outPostList.propType";
import PostListNoDataMobileView from "../post/view/postListNoData.mobileView";

function OutPostListMobileView(props) {
  const {
    listId,
    posts,
    onOpenUpdatePostDialog,
    onOpenDecidePostDialog,
    onAwareReturnPostClick,
    awaringReturnPostIds
  } = props;
  let content;
  if (posts.length === 0) {
    content = <PostListNoDataMobileView />;
  } else {
    content = (
      <FlatList
        data={posts}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item: post }) => <Text>{post.title}</Text>}
      />
    );

    // content = posts.map(post => (
    //   <Style key={post.id}>
    //     <OutPostItem
    //       post={post}
    //       onOpenUpdatePostDialog={onOpenUpdatePostDialog}
    //       onOpenDecidePostDialog={onOpenDecidePostDialog}
    //       onAwareReturnPostClick={onAwareReturnPostClick}
    //       isAwaringReturn={awaringReturnPostIds.includes(post.id)}
    //     />
    //   </Style>
    // ));
  }

  return <View id={listId}>{content}</View>;
}
OutPostListMobileView.propTypes = OutPostListPropType;

export default OutPostListMobileView;
