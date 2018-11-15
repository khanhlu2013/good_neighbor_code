import AuthSelector from "../../app/auth.selector";

//raw
const _posts = state => state.inPost.posts;
const _requestingPostIds = state => state.inPost.requestingPostIds;
const _deletingShareIds = state => state.inPost.deletingShareIds;

//calculated
const approveAlertPosts = state => {
  const loginUser = AuthSelector.loginUser(state);

  if (!loginUser) {
    return [];
  }

  return _posts(state).filter(post =>
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
  return _requestingPostIds(state).includes(postId);
};
const isUnRequestingPost = (state, shareId) => {
  return _deletingShareIds(state).includes(shareId);
};
const isAwaringShare = (state, shareId) =>
  state.inPost.awaringShareIds.includes(shareId);
const isReturningShare = (state, shareId) =>
  state.inPost.returningShareIds.includes(shareId);
const _post = (state, postId) => {
  return _posts(state).find(post => post.id === postId);
};
const _share = (state, shareId) => {
  const post = _posts(state).find(post =>
    post.shares.some(share => share.id === shareId)
  );
  const share = post.shares.find(share => share.id === shareId);
  return share;
};

//export
const InPostSelector = {
  //raw
  posts: _posts,
  requestingPostIds: _requestingPostIds,
  deletingShareIds: _deletingShareIds,

  //calculate
  post: _post,
  share: _share,
  approveAlertPosts,

  //ing
  isRequestingPost,
  isUnRequestingPost,
  isAwaringShare,
  isReturningShare
};

export default InPostSelector;
