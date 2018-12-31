import React from "react";
import styled from "styled-components";

import PostListNoDataWebView from "../../post/view/postListNoData.webView";
import OutPostItemWebView from "./outPostItem.webView";
import OutPostListPropType from "@gn/common/bus/outPost/propType/outPostList.propType";

const Style = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

function OutPostListWebView(props) {
  const {
    listId,
    posts,
    onUpdatePostClick,
    onDecidePostClick,
    onAwareReturnPostClick,
    awaringReturnPostIds
  } = props;
  let content;
  if (posts.length === 0) {
    content = <PostListNoDataWebView />;
  } else {
    content = posts.map(post => {
      const postId = post.id;
      return (
        <Style key={post.id}>
          <OutPostItemWebView
            post={post}
            onUpdatePostClick={() => onUpdatePostClick(postId)}
            onDecidePostClick={() => onDecidePostClick(postId)}
            onAwareReturnPostClick={() => onAwareReturnPostClick(postId)}
            isAwaringReturn={awaringReturnPostIds.includes(post.id)}
          />
        </Style>
      );
    });
  }

  return <div id={listId}>{content}</div>;
}
OutPostListWebView.propTypes = OutPostListPropType;

export default OutPostListWebView;
