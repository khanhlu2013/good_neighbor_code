import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import OutPostItem from "./outPostItem";
import PostListNoDataWebView from "../../post/view/postListNoData.webView";

const Style = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

function OutPostList(props) {
  const {
    listId,
    posts,
    onUpdatePost,
    onDecidePost,
    onAwareReturnPostClick,
    awaringReturnPostIds
  } = props;
  let content;
  if (posts.length === 0) {
    content = <PostListNoDataWebView />;
  } else {
    content = posts
      .sort((p1, p2) => p2.dateCreate - p1.dateCreate)
      .map(post => (
        <Style key={post.id}>
          <OutPostItem
            post={post}
            onUpdatePost={onUpdatePost}
            onDecidePost={onDecidePost}
            onAwareReturnPostClick={onAwareReturnPostClick}
            isAwaringReturn={awaringReturnPostIds.includes(post.id)}
          />
        </Style>
      ));
  }

  return <div id={listId}>{content}</div>;
}
OutPostList.propTypes = {
  listId: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  onUpdatePost: PropTypes.func.isRequired,
  onDecidePost: PropTypes.func.isRequired,
  onAwareReturnPostClick: PropTypes.func.isRequired,
  awaringReturnPostIds: PropTypes.array.isRequired
};

export default OutPostList;
