class User {
  constructor(id, email, name, profileImageUrl) {
    Object.assign(this, { id, email, name, profileImageUrl });
  }

  getNameAndEmail() {
    return `${this.name}, ${this.email}`;
  }
}

export default User;
