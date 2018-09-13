const { connectionTree } = require("../helper_connection");

describe("ConnectionManagement", () => {
  describe("SearchByEmail", () => {
    const lu = {
      email: "lu@us.com",
      name: "Lu Tran"
    };
    const tu = {
      email: "tu@pr.com",
      name: "Tu Nguyen"
    };

    beforeEach(() => {
      cy.setupDB([lu, tu]);
      cy.loadApp();
    });

    afterEach(() => {
      cy.logout();
    });

    it("can do simple search (without modify connection)", () => {
      //login
      cy.login(lu.email);

      connectionTree.tab.focus();
      connectionTree.snap("ConnectionManagement init state");

      //SEARCH BY EMAIL - INVALID SEARCH
      searchAndSnap("Invalid search: empty email", "");
      searchAndSnap("Invalid search: invalid email", "xyz");
      searchAndSnap("Invalid search: self search email", lu.email);

      //SEARCH BY EMAIL - VALID SEARCH
      searchAndSnap("Valid search: email not found", "abc@efg.com");
      searchAndSnap("Valid search: email found", tu.email);
    });

    it("can modify connection", () => {
      //login as lu
      cy.login(lu.email);

      //create connection
      connectionTree.tab.focus();
      connectionTree.search(tu.email);

      connectionTree.snap("can search new user and display invite button");
      cy.get("#createConnectionBtn").click();
      connectionTree.snap("can invite user");

      cy.switchUser(tu.email);
      connectionTree.tab.focus();
      searchAndSnap("can search incomming connection", lu.email);

      //approve -> show approve
      connectionTree.inRequests_approve(0);
      connectionTree.snap("can search for already-friend user");

      //deny -> show deny
      connectionTree.friends_deny(0);
      connectionTree.snap("can search denied user");
    });
  });

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
      cy.setupDB([a, b, c]);
      cy.loadApp();
    });

    afterEach(() => {
      cy.logout();
    });

    it("can modify connection", () => {
      /*
        1. a -> b, a->c : (outFriend: 2,snap) (deny C, snap)
        2. c -> b
        3. a -> b <- c (inFriend:2, snap), (approve 1, snap) , (deny 1, snap)    
      */

      //1. a -> b, a->c : (outFriend: 2,snap) (deny C, snap)
      cy.login(a.email);
      connectionTree.tab.focus();
      connectionTree.search(b.email);
      cy.get("#createConnectionBtn").click();
      connectionTree.search(c.email);
      cy.get("#createConnectionBtn").click();
      connectionTree.snap("Waiting list can display correct data");

      connectionTree.outRequests_deny(1);
      connectionTree.snap("remove one out-connection");

      //2. c -> b
      cy.switchUser(c.email);
      connectionTree.tab.focus();
      connectionTree.search(b.email);
      cy.get("#createConnectionBtn").click();

      //3. a -> b <- c (inFriend:2, snap), (approve 1, snap) , (deny 1, snap)
      cy.switchUser(b.email);
      connectionTree.tab.focus();
      connectionTree.snap("Friend request table can display correct data");
      cy.get("#InFriendTable .ConnectionTableRow").should("have.length", 2);

      connectionTree.inRequests_approve(0);
      connectionTree.inRequests_deny(0);
      connectionTree.snap("Approve/Deny InFriends");

      //approve deny
      connectionTree.denyRequests_approve(0);
      connectionTree.snap("Approve Denied-Friends");

      //deny friend
      connectionTree.friends_deny(0);
      connectionTree.friends_deny(0);
      connectionTree.snap(
        "Friend table and deny table can display correct data"
      );
    });
  });
});

function searchAndSnap(snapshotName, email) {
  connectionTree.search(email);
  connectionTree.snap(snapshotName);
}

function clickAndSnap(snapshotName, clickSelector) {
  cy.get(clickSelector).click();
  connectionTree.snap(snapshotName);
}
