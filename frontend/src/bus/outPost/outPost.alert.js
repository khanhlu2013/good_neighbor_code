export const filterOutPostRequestAlert = posts =>
  posts.filter(post => post.requestShares.length !== 0 && !post.curBorrowShare);

export const filterOutPostReturnAlert = posts =>
  posts.filter(post => post.unawareReturnShareLatest);
