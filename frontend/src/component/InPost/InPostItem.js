import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { InPostItemHeading } from "./InPostItem_Heading";
import { InPostItemRequestList } from "./InPostItem_RequestList";
import { InPostItemReturnList } from "./InPostItem_ReturnList";
import { InPostItemFooting } from "./InPostItem_Footing";
import { User } from "../../model/user";
import { nullOrRequiredValidator } from "../../util";

function InPostBody(props) {
  const { title, description, borrower } = props;

  return (
    <div className="in-post-item-body">
      <div>
        <span className="text-secondary font-weight-light">title: </span>
        {title}
      </div>
      <div>
        <span className="text-secondary font-weight-light">borrower: </span>
        {borrower ? `${borrower.name} ${borrower.email}` : "none"}
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
  description: PropTypes.string.isRequired,
  borrower: nullOrRequiredValidator("object", User)
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
  const curBorrowShare = post.curBorrowShare || null;
  const borrower = curBorrowShare ? curBorrowShare.borrower : null;
  return (
    <div className="in-post-item bg-white">
      <InPostItemHeading postUser={post.user} dateCreated={post.dateCreated} />

      <div className="container">
        <InPostBody
          title={post.title}
          description={post.description}
          borrower={borrower}
        />
        <InPostItemRequestList shares={post.requestShares} />
        <InPostItemReturnList shares={post.returnShares} />
        <InPostItemFooting
          postId={post.id}
          loginUser={loginUser}
          isActive={post.isActive}
          curBorrowShare={curBorrowShare}
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
