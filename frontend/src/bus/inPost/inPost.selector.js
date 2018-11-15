export const selectInPostApproveAlert = (posts, loginUserId) => {
  if (!loginUserId) {
    return [];
  }

  return posts.filter(post =>
    post.shares.some(
      share =>
        share.borrower.id === loginUserId &&
        share.isApprove === true &&
        share.isAwareApprove === false &&
        share.isReturn === false
    )
  );
};

const requestingPostIds = state => state.inPost.requestingPostIds;

const isRequestingPost = (state, postId) => {
  return requestingPostIds(state).includes(postId);
};

const InPostSelector = {
  isRequestingPost,
  requestingPostIds
};

export default InPostSelector;
