import React from "react";
import PropTypes from "prop-types";
import { OutPostItem } from "./outPostItem";

function OutPostList(props) {
  const { posts, onEditPost, onDecidePost } = props;
  let content;
  if (posts.length === 0) {
    content = <p className="text-muted text-center h4">there are no data</p>;
  } else {
    content = posts
      .sort((p1, p2) => p2.dateCreate - p1.dateCreate)
      .map(post => {
        return (
          <OutPostItem
            key={post.id}
            post={post}
            onEditPost={onEditPost}
            onDecidePost={onDecidePost}
          />
        );
      });
  }

  return <div id="OutPostList-react">{content}</div>;
}
OutPostList.propTypes = {
  posts: PropTypes.array.isRequired,
  onEditPost: PropTypes.func.isRequired,
  onDecidePost: PropTypes.func.isRequired
};

export { OutPostList };
