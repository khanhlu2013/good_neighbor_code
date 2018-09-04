class Post {
  constructor(id, user, isActive, title, description, dateCreated, shares) {
    Object.assign(this, {
      id,
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

  isRequestingBy(userId) {
    const lst = this.requesting.filter(
      request => request.borrower.id === userId
    );
    if (lst.length > 1) {
      throw Error("Unexpected duplicate requesting data");
    }

    return lst.length === 1;
  }
}

export { Post };
