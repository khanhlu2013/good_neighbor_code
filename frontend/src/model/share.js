class Share {
  constructor(
    id,
    borrower,
    dateCreated,
    isApprove,
    isAwareApprove,
    isReturnedByTo,
    isAwareReturn,
    post
  ) {
    Object.assign(this, {
      id,
      borrower,
      dateCreated,
      isApprove,
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
    return this.isApprove === undefined;
  }

  get isBorrow() {
    return this.isApprove === true && this.isReturnedByTo === false;
  }

  get isReturn() {
    return this.isApprove === true && this.isReturnedByTo === true;
  }

  get isDenied() {
    return this.isApprove === false;
  }
}

export { Share };
