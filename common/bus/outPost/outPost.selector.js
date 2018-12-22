export const selectOutPostRequestAlert = posts =>
  posts.filter(post => post.requestShares.length !== 0 && !post.curBorrowShare);

export const selectOutPostReturnAlert = posts =>
  posts.filter(post => post.unawareReturnShareLatest);
