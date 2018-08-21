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
      cy.resetDB();
      cy.insertUserDB([lu, tu]);
      cy.loadApp();
    });

    afterEach(() => {
      cy.logout();
    });

    it("can do simple search (without modify connection)", () => {
      //login
      cy.login(lu.email);

      //test the profile page
      snap("ConnectionManagement init state");

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
      search(tu.email);
      clickAndSnap("Created connection", "#createConnectionBtn");
      clickAndSnap("DenyConnectionByFrom", "#denyConnectionByFromBtn");
      clickAndSnap("ApproveConnectionByFrom", "#approveConnectionByFromBtn");

      cy.switchAccount(tu.email);

      searchAndSnap("Searched incomming connection", lu.email);

      clickAndSnap(
        "ApproveConnectionByToFirstTime",
        "#approveConnectionByToFirstTimeBtn"
      );
      clickAndSnap(
        "DenyConnectionByToSecondTime",
        "#denyConnectionByToSecondTimeBtn"
      );
      clickAndSnap(
        "ApproveConnectionByToSecondTime",
        "#approveConnectionByToSecondTimeBtn"
      );

      //search deny by to
      cy.get("#denyConnectionByToSecondTimeBtn").click();
      cy.switchAccount(lu.email);
      searchAndSnap("SeachDenyByTo", tu.email);
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
});

function snap(name) {
  cy.contains("Refreshing Connection ...").should("not.be.visible");
  cy.get("#ConnectionManagement-react").snapshot({ name });
}

function search(email) {
  cy.get("#SearchByEmail-react form input:text")
    .clear()
    .type(`${email}{enter}`);
  cy.get("#SearchByEmail-react input:submit").should("be.enabled"); //wait for search result
}

function searchAndSnap(snapshotName, email) {
  search(email);
  snap(snapshotName);
}

function clickAndSnap(snapshotName, clickSelector) {
  cy.get(clickSelector).click();
  snap(snapshotName);
}
