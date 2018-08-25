describe("ABC fixture", () => {
  it("insert fixture", () => {
    const a = {
      email: "a@a.com",
      name: "AAAAA"
    };
    const b = {
      email: "b@b.com",
      name: "BBBBB"
    };
    const c = {
      email: "c@c.com",
      name: "CCCCC"
    };

    cy.resetDB();
    cy.insertUserDB([a, b, c]);
  });
});
