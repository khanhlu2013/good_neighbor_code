class Share {
  constructor(
    id,
    borrower,
    dateCreated,
    isApprovedByFrom,
    isReturnedByTo,
    post
  ) {
    Object.assign(this, {
      id,
      borrower,
      dateCreated,
      isApprovedByFrom,
      isReturnedByTo,
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

  get isBorrowed() {
    return this.isApprovedByFrom === true && this.isReturnedByTo === true;
  }

  get isDenied() {
    return this.isApprovedByFrom === false;
  }
}

export { Share };
