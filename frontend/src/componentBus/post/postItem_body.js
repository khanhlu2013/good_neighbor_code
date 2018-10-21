import React from "react";
import PropTypes from "prop-types";

import { Post } from "../../model/post";
import { PostItemHistoryList } from "./postItem_historyList";
import { PostItemRequestList } from "./postItem_requestlist";
import "./postItem_body.css";

function PostItemBody(props) {
  const { post } = props;
  const { title, description } = post;
  const curBorrowShare = post.curBorrowShare;
  const borrower = curBorrowShare ? curBorrowShare.borrower : null;

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
      {borrower && (
        <div className="text-left mt-1">
          <mark>
            <span className="text-muted font-weight-light">borrowing by: </span>
            {borrower.getNameAndEmail()}
          </mark>
        </div>
      )}
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
