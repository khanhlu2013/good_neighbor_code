class Share {
  constructor(
    id,
    borrower,
    dateCreated,
    isApprove,
    isAwareApprove,
    isReturn,
    isAwareReturn,
    post
  ) {
    Object.assign(this, {
      id,
      borrower,
      dateCreated,
      isApprove,
      isAwareApprove,
      isReturn,
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
    return this.isApprove === true && this.isReturn === false;
  }

  get isDenied() {
    return this.isApprove === false;
  }
}

export { Share };
