export function isDecidablePost(post) {
  return Boolean(
    post.denyShares.length !== 0 ||
      post.requestShares.length !== 0 ||
      post.curBorrowShare
  );
}

export function getBorrowerOfTheLatestUnawareReturn(post) {
  return post.unawareReturnShareLatest
    ? post.unawareReturnShareLatest.borrower
    : null;
}

const OutPostItemFootLogic = {
  isDecidablePost,
  getBorrowerOfTheLatestUnawareReturn
};

export default OutPostItemFootLogic;
