class Post {
  constructor(
    _id,
    _user,
    _isActive,
    _title,
    _description,
    _dateCreated,
    shares
  ) {
    Object.assign(this, {
      _id,
      _user,
      _isActive,
      _title: _title,
      _description: _description,
      _dateCreated,
      shares
    });
  }

  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }

  get user() {
    return this._user;
  }
  set user(value) {
    this._user = value;
  }

  get isActive() {
    return this._isActive;
  }
  set isActive(value) {
    this._isActive = value;
  }

  get title() {
    return this._title;
  }
  set title(value) {
    this._title = value;
  }

  get description() {
    return this._description;
  }
  set description(value) {
    this._description = value;
  }

  get dateCreated() {
    return this._dateCreated;
  }
  set dateCreated(value) {
    this._dateCreated = value;
  }

  get shares() {
    return this._shares;
  }
  set shares(value) {
    this._shares = value;
  }

  get requestShares() {
    return this.shares.filter(share => share.isRequest);
  }

  get isRequestWithNoBorrow() {
    return this.requestShares.length !== 0 && !this.curBorrowShare;
  }

  get curBorrowShare() {
    const lst = this.shares.filter(share => share.isBorrow);
    if (lst.length > 1) throw Error("unexpected multiple borrow");
    const [result] = lst;
    return result;
  }

  get returnShares() {
    return this.shares.filter(share => share.isReturn);
  }

  get denyShares() {
    return this.shares.filter(share => share.isDenied);
  }

  isRequestBy(userId) {
    const lst = this.requestShares.filter(
      share => share.borrower.id === userId
    );
    if (lst.length > 1) {
      throw Error("Unexpected duplicate request data");
    }

    return lst.length === 1;
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
