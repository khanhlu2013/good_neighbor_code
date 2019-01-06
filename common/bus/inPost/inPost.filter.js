export function requestInPostsFilter(posts, loginUserId) {
  if (!loginUserId) {
    return [];
  }
  return posts.filter(post =>
    post.requestShares.some(share => share.borrower.id === loginUserId)
  );
}

export function approveAlertInPostsFilter(posts, loginUserId) {
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
}

export function borrowInPostsFilter(posts, loginUserId) {
  if (!loginUserId) {
    return [];
  }
  return posts.filter(
    post =>
      post.curBorrowShare && post.curBorrowShare.borrower.id === loginUserId
  );
}

export function returnSharesInPostFilter(posts, loginUserId) {
  if (!loginUserId) {
    return [];
  }

  const myInShares2D = posts.map(post =>
    post.shares.filter(share => share.borrower.id === loginUserId)
  );
  const myInShares1D = [].concat(...myInShares2D);
  const returnShares = myInShares1D.filter(share => share.isReturn);
  return returnShares;
}

const InPostFilter = {
  requestPosts: requestInPostsFilter,
  approveAlertPosts: approveAlertInPostsFilter,
  borrowPosts: borrowInPostsFilter,
  returnShares: returnSharesInPostFilter
};

export default InPostFilter;
