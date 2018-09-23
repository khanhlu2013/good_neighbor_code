import React from "react";
import PropTypes from "prop-types";
import { InPostItem } from "./inPostItem";

function InPostList(props) {
  const {
    posts,
    requestingPostIds,
    deletingShareIds,
    awaringShareIds,
    returningShareIds,
    onCreateShare,
    onDeleteShare,
    onAwareShare,
    onReturnShare,
    loginUser
  } = props;

  let content;
  if (posts.length === 0) {
    content = <p className="text-muted text-center h4">there are no data</p>;
  } else {
    content = posts
      .sort((p1, p2) => p2.dateCreated - p1.dateCreated)
      .map(post => (
        <InPostItem
          key={post.id}
          loginUser={loginUser}
          post={post}
          onCreateShare={onCreateShare}
          onDeleteShare={onDeleteShare}
          onAwareShare={onAwareShare}
          onReturnShare={onReturnShare}
          isRequestingPost={requestingPostIds.includes(post.id)}
          isDeleteingShare={post.shares.some(share =>
            deletingShareIds.includes(share.id)
          )}
          isAwaringShare={post.shares.some(share =>
            awaringShareIds.includes(share.id)
          )}
          isReturningShare={post.shares.some(share =>
            returningShareIds.includes(share.id)
          )}
        />
      ));
  }

  return <div id="InPostList-react">{content}</div>;
}
InPostList.propTypes = {
  posts: PropTypes.array.isRequired,
  requestingPostIds: PropTypes.array.isRequired,
  deletingShareIds: PropTypes.array.isRequired,
  awaringShareIds: PropTypes.array.isRequired,
  returningShareIds: PropTypes.array.isRequired,
  onCreateShare: PropTypes.func.isRequired,
  onDeleteShare: PropTypes.func.isRequired,
  onAwareShare: PropTypes.func.isRequired,
  onReturnShare: PropTypes.func.isRequired,
  loginUser: PropTypes.object.isRequired
};

export { InPostList };
