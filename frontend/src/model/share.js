class Share {
  constructor(id, borrower, dateCreated, isApprovedByFrom, isReturnedByTo) {
    Object.assign(this, {
      id,
      borrower,
      dateCreated,
      isApprovedByFrom,
      isReturnedByTo
    });
  }

  setPost(post) {
    this.post = post;
  }

  get isRequesting() {
    return this.isApprovedByFrom === undefined;
  }
}

export { Share };
