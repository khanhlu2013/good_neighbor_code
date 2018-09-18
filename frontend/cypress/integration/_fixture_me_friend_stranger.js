const mongodb = require("mongodb");
const { ObjectID } = mongodb;

describe("Fixture Dev 2", () => {
  const friend = {
    _id: new ObjectID(),
    email: "my@friend.com",
    name: "My Friend"
  };
  const stranger = {
    _id: new ObjectID(),
    email: "stranger@person.com",
    name: "Stranger Person"
  };
  const me = {
    _id: new ObjectID(),
    email: "me@me.com",
    name: "Me Here"
  };
  const c_me_friend = {
    _id: new ObjectID(),
    from: me._id,
    to: friend._id,
    approvedByTo: true,
    approvedByFrom: true
  };
  const c_friend_stranger = {
    _id: new ObjectID(),
    from: stranger._id,
    to: friend._id,
    approvedByTo: true,
    approvedByFrom: true
  };

  beforeEach(() => {
    cy.setupDb([friend, stranger, me], [c_me_friend, c_friend_stranger]);
    // cy.setupDb([friend, stranger, me], []);
  });

  it("insert fixture", () => {
    expect(true).to.equal(true);
  });
});
