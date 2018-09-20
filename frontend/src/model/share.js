class Share {
  constructor(
    id,
    borrower,
    dateCreated,
    isApprovedByFrom,
    isAwareApprove,
    isReturnedByTo,
    isAwareReturn,
    post
  ) {
    Object.assign(this, {
      id,
      borrower,
      dateCreated,
      isApprovedByFrom,
      isAwareApprove,
      isReturnedByTo,
      isAwareReturn,
      post
    });
  }

  setPost(post) {
    this.post = post;
  }

  get isRequest() {
    return this.isApprovedByFrom === undefined;
  }

  get isBorrow() {
    return this.isApprovedByFrom === true && this.isReturnedByTo === false;
  }

  get isReturn() {
    return this.isApprovedByFrom === true && this.isReturnedByTo === true;
  }

  get isDenied() {
    return this.isApprovedByFrom === false;
  }
}

export { Share };
