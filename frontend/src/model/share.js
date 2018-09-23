import _ from "underscore";

class Share {
  constructor(
    id,
    borrower,
    dateCreated,
    isApprove,
    isAwareApprove,
    isReturn,
    isAwareReturn,
    dateReturn,
    post
  ) {
    if (id) {
      //when id is truthy, it is not being temporary constructed in the front end and need to be validated
      if (!_.isDate(dateCreated)) {
        throw Error(`dateCreated '${dateCreated}' is not a Date`);
      }
    }

    Object.assign(this, {
      id,
      borrower,
      dateCreated,
      isApprove,
      isAwareApprove,
      isReturn,
      isAwareReturn,
      dateReturn,
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
