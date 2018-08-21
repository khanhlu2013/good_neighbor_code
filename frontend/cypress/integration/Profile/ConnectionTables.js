import { snap, search, searchAndSnap, clickAndSnap } from "./lib.js";

describe("ConnectionTables", () => {
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

  beforeEach(() => {
    cy.resetDB();
    cy.insertUserDB([a, b, c]);
    cy.loadApp();
  });

  afterEach(() => {
    cy.logout();
  });

  it("can modify connection", () => {
    /*
      . a -> b, a->c : (outFriend: 2,snap) (undo C, snap)
      . c -> b
      . b (inFriend:2, snap), (approve 1, snap) , (deny 1, snap)    
    */

    //a -> b, a->c : (outFriend: 2,snap) (undo C, snap)
    cy.login(a.email);
    search(b.email);
    cy.get("#createConnectionBtn").click();
    search(c.email);
    cy.get("#createConnectionBtn").click();
    snap("There are 2 outFriends");

    //cy.get("#OutFriendTable #ConnectionRow")
  });
});
