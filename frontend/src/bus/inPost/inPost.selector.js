import AuthSelector from "../../app/auth.selector";

//raw
const _posts = state => state.inPost.posts;
const _requestingPostIds = state => state.inPost.requestingPostIds;
const _deletingShareIds = state => state.inPost.deletingShareIds;
const _isFetchingPosts = state => state.inPost.isFetchingPosts;
const _isInitPosts = state => state.inPost.isInitPosts;

//calculated
const _requestPosts = state => {
  const posts = _posts(state);
  const loginUser = AuthSelector.loginUser(state);

  const requestPosts = posts.filter(post =>
    post.requestShares.some(share => share.borrower.id === loginUser.id)
  );
  return requestPosts;
};
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
const _borrowPosts = state => {
  const posts = _posts(state);
  const loginUser = AuthSelector.loginUser(state);

  const borrowPosts = posts.filter(
    post =>
      post.curBorrowShare && post.curBorrowShare.borrower.id === loginUser.id
  );
  return borrowPosts;
};
const _returnShares = state => {
  const posts = _posts(state);
  const loginUser = AuthSelector.loginUser(state);

  const myInShares2D = posts.map(post =>
    post.shares.filter(share => share.borrower.id === loginUser.id)
  );
  const myInShares1D = [].concat(...myInShares2D);
  const returnShares = myInShares1D.filter(share => share.isReturn);
  return returnShares;
};

//pending work
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

//single item
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
  isFetchingPosts: _isFetchingPosts,
  isInitPosts: _isInitPosts,

  //calculate
  requestPosts: _requestPosts,
  borrowPosts: _borrowPosts,
  approveAlertPosts,
  returnShares: _returnShares,

  //single item
  post: _post,
  share: _share,

  //ing
  isRequestingPost,
  isUnRequestingPost,
  isAwaringShare,
  isReturningShare
};

export default InPostSelector;
