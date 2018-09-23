class User {
  constructor(id, email, name) {
    Object.assign(this, { id, email, name });
  }

  getNameAndEmail() {
    return `${this.name}, ${this.email}`;
  }
}

export { User };
