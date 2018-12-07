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
    const lst = this.shares.filter(share => share.isCurrentlyBorrow());
    if (lst.length > 1) throw Error("unexpected multiple borrow");
    const [result = null] = lst;
    return result;
  }

  get returnShares() {
    return this.shares.filter(share => share.isReturn);
  }

  get unawareReturnShareLatest() {
    let result = null;
    let latestUnawareReturn = this.returnShares
      .sort((s1, s2) => s2.dateReturn - s1.dateReturn)
      .find(share => share.isReturn === true && share.isAwareReturn === false);

    if (latestUnawareReturn && !this.curBorrowShare) {
      result = latestUnawareReturn;
    }
    return result;
  }

  getUserLatestRequestShare(userId) {
    return (
      this.requestShares.find(share => share.borrower.id === userId) || null
    );
  }
}

export default Post;
