export function __getRequestOrBorrowShare(post, userId) {
  //userBorrowShare
  const curBorrowShare = post.curBorrowShare;
  let userBorrowShare = null;
  if (curBorrowShare && curBorrowShare.borrower.id === userId) {
    userBorrowShare = curBorrowShare;
  }

  //myRequestShare
  const userRequestShare =
    post.requestShares.find(share => share.borrower.id === userId) || null;

  return {
    userBorrowShare,
    userRequestShare
  };
}
