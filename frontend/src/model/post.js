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

  get requesting() {
    return this.shares.filter(share => share.isRequesting);
  }

  get borrowing() {
    const lst = this.shares.filter(share => share.isBorrowing);
    if (lst.length > 1) throw Error("unexpected multiple borrowing");
    const [result] = lst;
    return result;
  }

  get borrowed() {
    return this.shares.filter(share => share.isBorrowed);
  }

  get denied() {
    return this.shares.filter(share => share.isDenied);
  }

  isRequestingBy(userId) {
    const lst = this.requesting.filter(share => share.borrower.id === userId);
    if (lst.length > 1) {
      throw Error("Unexpected duplicate requesting data");
    }

    return lst.length === 1;
  }
}

export { Post };
