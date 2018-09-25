const mongodb = require("mongodb");
const { ObjectID } = mongodb;

const { connectionTree } = require("../helper/ui_connection");

describe("Connection SearchByEmail", () => {
  const lu = {
    id: new ObjectID(),
    email: "lu@us.com",
    name: "Lu Tran"
  };
  const tu = {
    id: new ObjectID(),
    email: "tu@pr.com",
    name: "Tu Nguyen"
  };

  const notFoundEmail = "abc@efg.com";

  it("can validate search input email format", () => {
    //login
    cy.setupDb([lu]);
    cy.loadApp();
    cy.login(lu.email);

    connectionTree.tab.focus();
    searchAndSnap("empty email", "");
    searchAndSnap("invalid email", "xyz");
    searchAndSnap("self search email", lu.email);
  });

  it("can search not-connected-user", () => {
    cy.setupDb([lu, tu]);
    cy.loadApp();
    cy.login(lu.email);

    connectionTree.tab.focus();
    searchAndSnap("Show search not found", notFoundEmail);
    searchAndSnap("Show found search result", tu.email);
  });

  it("can search connected-user", () => {
    cy.setupDb([lu, tu]);

    //in user
    const in_connection = {
      from: tu.id,
      to: lu.id,
      isApproveByTo: undefined,
      isApproveByFrom: true
    };
    cy.insertConnections([in_connection]);
    cy.loadApp();
    cy.login(lu.email);
    connectionTree.tab.focus();
    searchAndSnap("Can search in connection", tu.email);

    //out user
    cy.clearConnectionDb();
    const out_connection = {
      from: lu.id,
      to: tu.id,
      isApproveByTo: undefined,
      isApproveByFrom: true
    };
    cy.insertConnections([out_connection]);
    cy.loadApp();
    connectionTree.tab.focus();
    searchAndSnap("Can search out connection", tu.email);

    //friend user
    cy.clearConnectionDb();
    const friend_connection = {
      from: lu.id,
      to: tu.id,
      isApproveByTo: true,
      isApproveByFrom: true
    };
    cy.insertConnections([friend_connection]);
    cy.loadApp();
    connectionTree.tab.focus();
    searchAndSnap("Can search friend connection", tu.email);

    //in-deny user
    cy.clearConnectionDb();
    const in_deny_connection = {
      from: lu.id,
      to: tu.id,
      isApproveByTo: false,
      isApproveByFrom: true
    };
    cy.insertConnections([in_deny_connection]);
    cy.loadApp();
    connectionTree.tab.focus();
    searchAndSnap("Can search in-deny connection", tu.email);

    //out-deny user
    cy.clearConnectionDb();
    const out_deny_connection = {
      from: lu.id,
      to: tu.id,
      isApproveByTo: true,
      isApproveByFrom: false
    };
    cy.insertConnections([out_deny_connection]);
    cy.loadApp();
    connectionTree.tab.focus();
    searchAndSnap("Can search out-deny connection", tu.email);
  });

  it("can invite new user", () => {
    cy.setupDb([lu, tu]);
    cy.loadApp();
    cy.login(lu.email);

    //create connection
    connectionTree.tab.focus();
    connectionTree.search.exe(tu.email);
    connectionTree.search.getCreateConnectionBtn().click();
    connectionTree.search.snap("can invite user");
  });

  it("LoadingIcon (search/invite)", () => {
    cy.setupDb([lu, tu]);
    cy.loadApp();
    cy.login(lu.email);

    connectionTree.tab.focus();
    connectionTree.search.exe(tu.email);
    connectionTree.search.getSearchBtnLoadingIcon().should("be.visible");
    connectionTree.search.snapRightAway("Show loadingIcon during search user");

    connectionTree.search.getCreateConnectionBtn().click();
    connectionTree.search.getInviteBtnLoadingIcon().should("be.visible");
    connectionTree.search.snapRightAway("Show loadingIcon during invite user");
  });
});

function searchAndSnap(snapshotName, email) {
  connectionTree.search.exe(email);
  connectionTree.search.snap(snapshotName);
}
