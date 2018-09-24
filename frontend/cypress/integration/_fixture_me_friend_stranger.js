const mongodb = require("mongodb");
const { ObjectID } = mongodb;

describe("Fixture Dev 2", () => {
  const friend = {
    id: new ObjectID(),
    email: "my@friend.com",
    name: "My Friend"
  };
  const stranger = {
    id: new ObjectID(),
    email: "stranger@person.com",
    name: "Stranger Person"
  };
  const me = {
    id: new ObjectID(),
    email: "me@me.com",
    name: "Me Here"
  };
  const c_me_friend = {
    id: new ObjectID(),
    from: me.id,
    to: friend.id,
    approvedByTo: true,
    approvedByFrom: true
  };
  const c_friend_stranger = {
    id: new ObjectID(),
    from: stranger.id,
    to: friend.id,
    approvedByTo: true,
    approvedByFrom: true
  };

  beforeEach(() => {
    cy.setupDb([friend, stranger, me], [c_me_friend, c_friend_stranger]);
    //cy.setupDb([friend, stranger, me], []);
  });

  it("insert fixture", () => {
    expect(true).to.equal(true);
  });
});
