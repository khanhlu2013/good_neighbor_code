const mongodb = require("mongodb");
const { ObjectID } = mongodb;

describe("Fixture Dev 2", () => {
  const u1 = {
    _id: new ObjectID(),
    email: "1@1.com",
    name: "User One"
  };
  const u2 = {
    _id: new ObjectID(),
    email: "2@2.com",
    name: "User Two"
  };
  const me = {
    _id: new ObjectID(),
    email: "me@me.com",
    name: "Me Here"
  };
  const c_me_u1 = {
    _id: new ObjectID(),
    from: u1._id,
    to: me._id,
    approvedByTo: true,
    approvedByFrom: true
  };

  beforeEach(() => {
    cy.setupDB([u1, u2, me], [c_me_u1]);
  });

  it("insert fixture", () => {
    cy.loadApp();
    cy.login(u1.email);
  });
});
