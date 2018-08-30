class Post {
  constructor(postID, user, isActive, title, description, dateCreated, shares) {
    Object.assign(this, {
      postID,
      user,
      isActive,
      title,
      description,
      dateCreated,
      shares
    });
  }

  get borrowed() {
    return this.shares.filter(
      share => share.isApprovedByFrom && share.isReturnedByTo
    );
  }

  get borrowing() {
    const lst = this.shares.filter(
      share => share.isApprovedByFrom && !share.isReturnedByTo
    );

    if (lst.length > 1) {
      throw Error("Bug: unexpected multiple borrowing");
    }

    if (lst.length === 1) {
      return lst[0];
    }
    return null;
  }

  get requesting() {
    return this.shares.filter(share => share.isApprovedByFrom === undefined);
  }

  get rejected() {
    return this.shares.filter(share => share.isApprovedByFrom === false);
  }
}

class Share {
  constructor(
    shareID,
    borrower,
    dateCreated,
    isApprovedByFrom,
    isReturnedByTo
  ) {
    Object.assign(this, {
      shareID,
      borrower,
      dateCreated,
      isApprovedByFrom,
      isReturnedByTo
    });
  }
}

export { Post, Share };
