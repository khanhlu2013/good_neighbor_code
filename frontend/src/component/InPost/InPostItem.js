import React from "react";
import PropTypes from "prop-types";
import { InPostItemHeading } from "./inPostItem_heading";
import { InPostItemRequestList } from "./inPostItem_requestlist";
import { InPostItemReturnList } from "./inPostItem_returnList";
import { InPostItemFooting } from "./inPostItem_footing";

function InPostBody(props) {
  const { title, description } = props;

  return (
    <div className="in-post-item-body">
      <div>
        <span className="text-secondary font-weight-light">title: </span>
        {title}
      </div>
      <div>
        <span className="text-secondary font-weight-light">description: </span>
        {description}
      </div>
    </div>
  );
}
InPostBody.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

function InPostItem(props) {
  const {
    loginUser,
    post,
    isRequestingPost,
    isDeleteingShare,
    isAwaringShare,
    isReturningShare,
    onCreateShare,
    onDeleteShare,
    onAwareShare,
    onReturnShare
  } = props;
  return (
    <div className="in-post-item bg-white">
      <InPostItemHeading postUser={post.user} dateCreate={post.dateCreate} />

      <div className="container">
        <InPostBody title={post.title} description={post.description} />
        {post.requestShares.length !== 0 && (
          <InPostItemRequestList shares={post.requestShares} />
        )}
        {post.returnShares.length !== 0 && (
          <InPostItemReturnList shares={post.returnShares} />
        )}
        <InPostItemFooting
          postId={post.id}
          loginUser={loginUser}
          isActive={post.isActive}
          curBorrowShare={post.curBorrowShare}
          myRequestShare={
            post.requestShares.find(
              share => share.borrower.id === loginUser.id
            ) || null
          }
          isRequestingPost={isRequestingPost}
          isDeleteingShare={isDeleteingShare}
          isAwaringShare={isAwaringShare}
          isReturningShare={isReturningShare}
          onCreateShare={onCreateShare}
          onDeleteShare={onDeleteShare}
          onAwareShare={onAwareShare}
          onReturnShare={onReturnShare}
        />
      </div>
    </div>
  );
}
InPostItem.propTypes = {
  loginUser: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  isRequestingPost: PropTypes.bool.isRequired,
  isDeleteingShare: PropTypes.bool.isRequired,
  isAwaringShare: PropTypes.bool.isRequired,
  isReturningShare: PropTypes.bool.isRequired,
  onCreateShare: PropTypes.func.isRequired,
  onDeleteShare: PropTypes.func.isRequired,
  onAwareShare: PropTypes.func.isRequired,
  onReturnShare: PropTypes.func.isRequired
};

export { InPostItem };
