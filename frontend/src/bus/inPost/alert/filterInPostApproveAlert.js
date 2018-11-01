const filterInPostApproveAlert = (posts, loginUserId) => {
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

export default filterInPostApproveAlert;
