import React from "react";
import { FlatList, View, Text } from "react-native";
import PostListNoDataMobileView from "../../post/view/postListNoData.mobileView";
import OutPostItemHeadMobileView from "./outPostItemHead.mobileView";
import PostItemStyle from "../../post/style/postItem_style";
import PostItemBodyMobileView from "../../post/view/postItem_body.mobileView";
import PostItemFootMobileStyle from "../../post/style/postItemFoot.mobileStyle";
import OutPostItemFootMobileView from "./outPostItemFoot.mobileView";
import OutPostItemFootLogic from "../../../common/bus/outPost/controller/outPostItemFoot.logic";

function PostItemMobileView(props) {
  const {
    post,
    onUpdatePostClick,
    onDecidePostClick,
    onAwareReturnPost,
    isAwaringReturn
  } = props;
  const postId = post.id;

  return (
    <PostItemStyle>
      <OutPostItemHeadMobileView
        postId={post.id}
        onUpdatePostClick={onUpdatePostClick}
        dateCreate={post.dateCreate}
      />
      <PostItemBodyMobileView post={post} />
      <PostItemFootMobileStyle>
        <OutPostItemFootMobileView
          postId={postId}
          //aware return
          isAwaringReturn={isAwaringReturn}
          borrowerOfTheLatestUnawareReturn={OutPostItemFootLogic.getBorrowerOfTheLatestUnawareReturn(
            post
          )}
          onAwareReturnPost={onAwareReturnPost}
          //decide
          isDecidablePost={OutPostItemFootLogic.isDecidablePost(post)}
          onDecidePostClick={onDecidePostClick}
        />
      </PostItemFootMobileStyle>
    </PostItemStyle>
  );
}

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
          <PostItemMobileView
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
