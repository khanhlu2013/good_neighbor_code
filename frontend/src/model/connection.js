class Connection {
  constructor(id, from, to, approvedByTo, approvedByFrom) {
    Object.assign(this, { id, from, to, approvedByTo, approvedByFrom });
  }

  getTheOtherUser(userId) {
    let theOther;
    if (this.from.id === userId) {
      theOther = this.to;
    } else if (this.to.id === userId) {
      theOther = this.from;
    } else {
      throw Error("Error: unexpected connection");
    }

    return theOther;
  }
}

export { Connection };
