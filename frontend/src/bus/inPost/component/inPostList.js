import React from "react";
import PropTypes from "prop-types";
import { InPostItem } from "./inPostItem";
import PostListNoData from "../../post/component/postListNoData";

function InPostList(props) {
  const { listId, posts, loginUser } = props;

  let content;
  if (posts.length === 0) {
    content = <PostListNoData />;
  } else {
    content = posts
      .sort((p1, p2) => p2.dateCreate - p1.dateCreate)
      .map(post => (
        <InPostItem key={post.id} loginUser={loginUser} post={post} />
      ));
  }

  return <div id={listId}>{content}</div>;
}
InPostList.propTypes = {
  listId: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  loginUser: PropTypes.object.isRequired
};

export default InPostList;
