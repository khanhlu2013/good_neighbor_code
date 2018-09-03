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

      cy.switchUser(tu.email);

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
      cy.switchUser(lu.email);
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
      search(b.email);
      cy.get("#createConnectionBtn").click();
      search(c.email);
      cy.get("#createConnectionBtn").click();
      snap("There are 2 out-connection");

      cy.get("#OutFriendTable .ConnectionTableRow")
        .eq(1)
        .find(".ConnectionTableRowDenyBtn")
        .click();

      snap("remove one out-connection");

      //2. c -> b
      cy.switchUser(c.email);
      search(b.email);
      cy.get("#createConnectionBtn").click();

      //3. a -> b <- c (inFriend:2, snap), (approve 1, snap) , (deny 1, snap)
      cy.switchUser(b.email);
      snap("There are 2 in-connection");
      cy.get("#InFriendTable .ConnectionTableRow").should("have.length", 2);
      cy.get("#InFriendTable .ConnectionTableRow")
        .eq(0)
        .find(".ConnectionTableRowApproveBtn")
        .click();
      cy.get("#InFriendTable .ConnectionTableRow")
        .eq(0)
        .find(".ConnectionTableRowDenyBtn")
        .click();
      snap("Approve/Deny InFriends");

      //approve deny
      cy.get("#DenyFriendTable .ConnectionTableRow")
        .eq(0)
        .find(".ConnectionTableRowApproveBtn")
        .click();
      snap("Approve Denied-Friends");

      //deny friend
      cy.get("#FriendTable .ConnectionTableRow")
        .eq(0)
        .find(".ConnectionTableRowDenyBtn")
        .click();
      cy.get("#FriendTable .ConnectionTableRow")
        .eq(0)
        .find(".ConnectionTableRowDenyBtn")
        .click();
      snap("Deny Approved-Friends");
    });
  });
});

function snap(name) {
  // cy.contains("Refreshing Connection ...").should("not.be.visible");
  // cy.contains("Refreshing Connection ...").should("be.visible");
  cy.contains("Refreshing Connection ...").should("not.be.visible");
  cy.get("#ConnectionManagement-react").snapshot({ name });
}

function search(email) {
  cy.get("#SearchByEmail-react>form>input:text")
    .clear()
    .type(`${email}{enter}`);
  cy.get("#SearchByEmail-react>form>input:submit").should("be.enabled"); //wait for search result
}

function searchAndSnap(snapshotName, email) {
  search(email);
  snap(snapshotName);
}

function clickAndSnap(snapshotName, clickSelector) {
  cy.get(clickSelector).click();
  snap(snapshotName);
}
