//raw data
const _posts = state => state.outPost.posts;
const _isInitPosts = state => state.outPost.isInitPosts;
const _isFetchingPosts = state => state.outPost.isFetchingPosts;
const _awaringReturnPostIds = state => state.outPost.awaringReturnPostIds;

//derived data
const _requestAlertPosts = state =>
  _posts(state).filter(
    post => post.requestShares.length !== 0 && !post.curBorrowShare
  );
const _borrowPosts = state => _posts(state).filter(post => post.curBorrowShare);
const _returnAlertPosts = state =>
  _posts(state).filter(post => post.unawareReturnShareLatest);
const _returnShares = state => {
  const returnShares2D = _posts(state).map(post =>
    post.shares.filter(share => share.isReturn)
  );
  const returnShares1D = [].concat(...returnShares2D);
  return returnShares1D;
};

const OutPostSelector = {
  //raw data
  posts: _posts,
  isInitPosts: _isInitPosts,
  isFetchingPosts: _isFetchingPosts,
  awaringReturnPostIds: _awaringReturnPostIds,

  //derived data
  requestAlertPosts: _requestAlertPosts,
  borrowPosts: _borrowPosts,
  returnAlertPosts: _returnAlertPosts,
  returnShares: _returnShares
};

export default OutPostSelector;
