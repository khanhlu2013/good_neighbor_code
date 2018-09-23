import _ from "underscore";

class Post {
  constructor(id, user, isActive, title, description, dateCreate, shares) {
    if (id) {
      //when id is truthy, it is not being temporary constructed in the front end and need to be validated
      if (id && !_.isDate(dateCreate)) {
        throw Error(`dateCreate '${dateCreate}' is not a Date`);
      }
    }

    Object.assign(this, {
      id,
      user,
      isActive,
      title,
      description,
      dateCreate,
      shares
    });
  }

  get requestShares() {
    return this.shares.filter(share => share.isRequest);
  }

  get denyShares() {
    return this.shares.filter(share => share.isDenied);
  }

  get curBorrowShare() {
    const lst = this.shares.filter(share => share.isBorrow);
    if (lst.length > 1) throw Error("unexpected multiple borrow");
    const [result] = lst;
    return result || null;
  }

  get returnShares() {
    return this.shares.filter(share => share.isReturn);
  }

  get isRequestWithNoBorrow() {
    return this.requestShares.length !== 0 && !this.curBorrowShare;
  }

  getValidateError() {
    let title = undefined;
    let description = undefined;

    if (!this.title.trim()) {
      title = "title is required";
    }

    if (!this.description.trim()) {
      description = "description is required";
    }

    if (!title && !description) {
      return null;
    } else {
      return { title, description };
    }
  }
}

export { Post };
