import React from "react";
import PropTypes from "prop-types";
import { PostItemBody } from "../postItem_body";
import { PostItemRequestList } from "../postItem_requestlist";
import { OutPostItemHeading } from "./outPostItem_heading";

function OutPostItem(props) {
  const { post, onEditPost, onDecidePost } = props;

  const onEditBtnClicked = e => {
    onEditPost(post);
  };

  const onDecidePostClick = e => {
    onDecidePost(post);
  };
  const curBorrowShare = post.curBorrowShare;
  const borrower = curBorrowShare ? curBorrowShare.borrower : null;

  return (
    <div className="in-post-item bg-white">
      <OutPostItemHeading dateCreate={post.dateCreate} />

      <div className="container">
        <PostItemBody title={post.title} description={post.description} />
        {post.requestShares.length !== 0 && (
          <PostItemRequestList shares={post.requestShares} />
        )}

        <div className="text-left">
          {borrower && (
            <span>
              <span className="text-muted font-weight-light">
                currently borrow by:{" "}
              </span>
              {borrower.getNameAndEmail()}
            </span>
          )}
        </div>
        <div className="text-right">
          <button onClick={onEditBtnClicked} className="btn btn-primary">
            edit
          </button>
          {(post.denyShares.length !== 0 ||
            post.requestShares.length !== 0 ||
            curBorrowShare) && (
            <button onClick={onDecidePostClick} className="btn btn-success">
              share
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

OutPostItem.propsType = {
  post: PropTypes.object.isRequired,
  onEditPost: PropTypes.func.isRequired,
  onDecidePost: PropTypes.func.isRequired
};

export { OutPostItem };
