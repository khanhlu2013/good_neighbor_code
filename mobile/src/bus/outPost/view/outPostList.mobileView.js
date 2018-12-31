import React from "react";
import { FlatList, View, Text } from "react-native";
import PostListNoDataMobileView from "../../post/view/postListNoData.mobileView";
import OutPostItemHeadMobileView from "./outPostItemHead.mobileView";
import PostItemStyle from "../../post/style/postItem_style";
import PostItemBodyMobileView from "../../post/view/postItem_body.mobileView";
import PostItemFootMobileStyle from "../../post/style/postItemFoot.mobileStyle";

function PostItemMobileView(props) {
  const { post } = props;

  function onUpdatePostClick() {
    console.log("On update post click; id = ", post.id);
  }

  return (
    <PostItemStyle>
      <OutPostItemHeadMobileView
        postId={post.id}
        onUpdatePostClick={onUpdatePostClick}
        dateCreate={post.dateCreate}
      />
      <PostItemBodyMobileView post={post} />
      <PostItemFootMobileStyle>
        <Text>bottom</Text>
      </PostItemFootMobileStyle>
    </PostItemStyle>
  );
}

function OutPostListMobileView(props) {
  const { listId, posts } = props;
  let content;
  if (posts.length === 0) {
    content = <PostListNoDataMobileView />;
  } else {
    content = (
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({ item: post }) => <PostItemMobileView post={post} />}
      />
    );
  }

  return <View id={listId}>{content}</View>;
}
export default OutPostListMobileView;
