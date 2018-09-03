class Connection {
  constructor(id, from, to, approvedByTo, approvedByFrom) {
    Object.assign(this, { id, from, to, approvedByTo, approvedByFrom });
  }
}

export { Connection };
