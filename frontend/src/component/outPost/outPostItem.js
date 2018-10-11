import React from "react";
import PropTypes from "prop-types";

import { PostItemBody } from "../post/postItem_body";
import { PostItemRequestList } from "../post/postItem_requestlist";
import { LoadingIcon } from "../../util/loadingIcon";
import { PostItemHeading } from "../post/postItemHeading";

function OutPostItem(props) {
  const {
    post,
    onEditPost,
    onDecidePost,
    isAwaringReturn,
    onAwareReturnPost
  } = props;

  const onEditBtnClicked = e => {
    onEditPost(post);
  };

  const onDecidePostClick = e => {
    onDecidePost(post);
  };

  const onAwareReturnClick = e => {
    onAwareReturnPost(post.id);
  };

  const curBorrowShare = post.curBorrowShare;
  const borrower = curBorrowShare ? curBorrowShare.borrower : null;

  return (
    <div id="outPost-item-react" className="post-item shadow-box">
      <PostItemHeading postUser={null} dateCreate={post.dateCreate} />

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
        {post.unawareReturnShareLatest && (
          <span>
            {`item is returned by ${post.unawareReturnShareLatest.borrower.getNameAndEmail()}`}
            {isAwaringReturn ? (
              <LoadingIcon text={"receiving"} />
            ) : (
              <button
                id="outPostItem-awareReturnBtn-react"
                onClick={onAwareReturnClick}
                className="btn btn-success"
              >
                confirm returned
              </button>
            )}
          </span>
        )}
        <button
          id="outPostItem-editBtn-react"
          onClick={onEditBtnClicked}
          className="btn btn-primary"
        >
          edit
        </button>
        {(post.denyShares.length !== 0 ||
          post.requestShares.length !== 0 ||
          curBorrowShare) && (
          <button
            id="outPostItem-decisionBtn-react"
            onClick={onDecidePostClick}
            className="btn btn-success"
          >
            share
          </button>
        )}
      </div>
    </div>
  );
}

OutPostItem.propTypes = {
  post: PropTypes.object.isRequired,
  onEditPost: PropTypes.func.isRequired,
  onDecidePost: PropTypes.func.isRequired,
  onAwareReturnPost: PropTypes.func.isRequired,
  isAwaringReturn: PropTypes.bool.isRequired
};

export { OutPostItem };
