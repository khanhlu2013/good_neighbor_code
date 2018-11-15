import AuthSelector from "../../app/auth.selector";

//raw
const posts = state => state.inPost.posts;
const requestingPostIds = state => state.inPost.requestingPostIds;
const deletingShareIds = state => state.inPost.deletingShareIds;

//calculated
const approveAlertPosts = state => {
  const loginUser = AuthSelector.loginUser(state);

  if (!loginUser) {
    return [];
  }

  posts().filter(post =>
    post.shares.some(
      share =>
        share.borrower.id === loginUser.loginUserId &&
        share.isApprove === true &&
        share.isAwareApprove === false &&
        share.isReturn === false
    )
  );
};

const isRequestingPost = (state, postId) => {
  return requestingPostIds(state).includes(postId);
};
const isUnRequestingPost = (state, shareId) => {
  return deletingShareIds(state).includes(shareId);
};
const isAwaringShare = (state, shareId) =>
  state.inPost.awaringShareIds.includes(shareId);
const isReturningShare = (state, shareId) =>
  state.inPost.returningShareIds.includes(shareId);

const share = (state, shareId) => {
  const posts = posts(state);
  const post = posts(state).find(post =>
    post.shares.some(share => share.id === shareId)
  );
  const share = post.shares.find(share => share.id === shareId);
  return share;
};

//export
const InPostSelector = {
  //raw
  posts,
  requestingPostIds,
  deletingShareIds,

  //calculate
  share,
  isRequestingPost,
  approveAlertPosts,
  isUnRequestingPost,
  isAwaringShare,
  isReturningShare
};

export default InPostSelector;
