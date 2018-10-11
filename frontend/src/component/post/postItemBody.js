import React from "react";
import PropTypes from "prop-types";

import { Post } from "../../model/post";
import { PostItemHistoryList } from "./postItemHistoryList";
import { PostItemRequestList } from "./postItemRequestlist";
import "./postItemBody.css";

function PostItemBody(props) {
  const { post } = props;
  const { title, description } = post;

  return (
    <div className="post-item-body">
      <div>
        <span className="text-secondary font-weight-light">title: </span>
        {title}
      </div>
      <div>
        <span className="text-secondary font-weight-light">description: </span>
        {description}
      </div>
      {post.requestShares.length !== 0 && (
        <PostItemRequestList shares={post.requestShares} />
      )}
      {post.returnShares.length !== 0 && (
        <PostItemHistoryList shares={post.returnShares} />
      )}
    </div>
  );
}
PostItemBody.propTypes = {
  post: PropTypes.instanceOf(Post).isRequired
};

export { PostItemBody };
