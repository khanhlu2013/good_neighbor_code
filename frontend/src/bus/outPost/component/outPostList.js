import React from "react";
import PropTypes from "prop-types";
import OutPostItem from "./outPostItem";
import PostListNoData from "../../post/component/postListNoData";

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
    content = <PostListNoData />;
  } else {
    content = posts
      .sort((p1, p2) => p2.dateCreate - p1.dateCreate)
      .map(post => (
        <OutPostItem
          key={post.id}
          post={post}
          onUpdatePost={onUpdatePost}
          onDecidePost={onDecidePost}
          onAwareReturnPostClick={onAwareReturnPostClick}
          isAwaringReturn={awaringReturnPostIds.includes(post.id)}
        />
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
