import { ui, tab } from "../helper/ui";
import { createUser, createConnection } from "../helper/model";

describe("Connection search", () => {
  const lu = createUser("Lu Tran", "lu@us.com");
  const tu = createUser("Tu Nguyen", "tu@pr.com");

  const notFoundEmail = "abc@efg.com";

  it("can validate search input email format", () => {
    //login
    cy.setupDb([lu]);
    cy.loadApp();
    cy.login(lu.email);

    tab.connection.focus();
    tab.connection.search.focus();
    searchAndSnap("empty email", "");
    searchAndSnap("invalid email", "xyz");
    searchAndSnap("self search email", lu.email);
  });

  it("can search not-connected-user", () => {
    cy.setupDb([lu, tu]);
    cy.loadApp();
    cy.login(lu.email);

    tab.connection.focus();
    tab.connection.search.focus();
    searchAndSnap("Show search not found", notFoundEmail);
    searchAndSnap("Show found search result", tu.email);
  });

  it("can search connected-user", () => {
    cy.setupDb([lu, tu]);

    //in user
    const in_connection = createConnection(tu, lu, true, undefined);
    cy.insertConnections([in_connection]);
    cy.loadApp();
    cy.login(lu.email);
    tab.connection.focus();
    tab.connection.search.focus();
    searchAndSnap("Can search in connection", tu.email);

    //out user
    cy.clearConnectionDb();
    const out_connection = createConnection(lu, tu, true, undefined);
    cy.insertConnections([out_connection]);
    cy.loadApp();
    tab.connection.focus();
    tab.connection.search.focus();
    searchAndSnap("Can search out connection", tu.email);

    //friend user
    cy.clearConnectionDb();
    const friend_connection = createConnection(lu, tu, true, true);
    cy.insertConnections([friend_connection]);
    cy.loadApp();
    tab.connection.focus();
    tab.connection.search.focus();
    searchAndSnap("Can search friend connection", tu.email);

    //out connection - to deny
    let con;
    cy.clearConnectionDb();
    con = createConnection(lu, tu, true, false);
    cy.insertConnections([con]);
    cy.loadApp();
    tab.connection.focus();
    tab.connection.search.focus();
    searchAndSnap("Can search out connection - to deny", tu.email);

    //out connection - from deny
    cy.clearConnectionDb();
    con = createConnection(lu, tu, false, true);
    cy.insertConnections([con]);
    cy.loadApp();
    tab.connection.focus();
    tab.connection.search.focus();
    searchAndSnap("Can search out connection - from deny", tu.email);

    //in connection - to deny
    cy.clearConnectionDb();
    con = createConnection(tu, lu, true, false);
    cy.insertConnections([con]);
    cy.loadApp();
    tab.connection.focus();
    tab.connection.search.focus();
    searchAndSnap("Can search in connection - to deny", tu.email);

    //in connection - from deny
    cy.clearConnectionDb();
    con = createConnection(tu, lu, false, true);
    cy.insertConnections([con]);
    cy.loadApp();
    tab.connection.focus();
    tab.connection.search.focus();
    searchAndSnap("Can search in connection - from deny", tu.email);
  });

  it("can invite new user", () => {
    cy.setupDb([lu, tu]);
    cy.loadApp();
    cy.login(lu.email);

    //create connection
    tab.connection.focus();
    tab.connection.search.focus();
    ui.connection.search.exe(tu.email);
    ui.connection.search.getCreateConnectionBtn().click();
    ui.connection.search.snap("can invite user");
  });
});

function searchAndSnap(snapshotName, email) {
  ui.connection.search.exe(email);
  ui.connection.search.snap(snapshotName);
}
