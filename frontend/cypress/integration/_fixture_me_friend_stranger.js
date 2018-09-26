import { createUser, createConnection } from "../helper/model";

describe("Fixture Dev 2", () => {
  const friend = createUser("My Friend", "my@friend.com");
  const stranger = createUser("Stranger Person", "stranger@person.com");
  const me = createUser("I Myself Me", "me@me.com");
  const c_me_friend = createConnection(me, friend, true, true);
  const c_friend_stranger = createConnection(friend, stranger, true, true);

  beforeEach(() => {
    cy.setupDb([friend, stranger, me], [c_me_friend, c_friend_stranger]);
    //cy.setupDb([friend, stranger, me], []);
  });

  it("insert fixture", () => {
    expect(true).to.equal(true);
  });
});
