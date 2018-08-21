import { snap, search, searchAndSnap, clickAndSnap } from "./lib.js";

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
    //test the login page view
    snap("Login page");

    //login
    cy.login(lu.email);

    //test the profile page
    snap("Profile page");

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
