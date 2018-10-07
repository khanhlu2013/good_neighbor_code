import React from "react";
import PropTypes from "prop-types";
import { OutPostItem } from "./outPostItem";

function OutPostList(props) {
  const {
    listId,
    posts,
    onEditPost,
    onDecidePost,
    onAwareReturnPost,
    awaringReturnPostIds
  } = props;
  let content;
  if (posts.length === 0) {
    content = <p className="text-muted text-center h4">there are no data</p>;
  } else {
    content = posts
      .sort((p1, p2) => p2.dateCreate - p1.dateCreate)
      .map(post => (
        <OutPostItem
          key={post.id}
          post={post}
          onEditPost={onEditPost}
          onDecidePost={onDecidePost}
          onAwareReturnPost={onAwareReturnPost}
          isAwaringReturn={awaringReturnPostIds.includes(post.id)}
        />
      ));
  }

  return <div id={listId}>{content}</div>;
}
OutPostList.propTypes = {
  listId: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  onEditPost: PropTypes.func.isRequired,
  onDecidePost: PropTypes.func.isRequired,
  onAwareReturnPost: PropTypes.func.isRequired,
  awaringReturnPostIds: PropTypes.array.isRequired
};

export { OutPostList };
