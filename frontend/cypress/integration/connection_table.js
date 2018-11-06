import { ui, tab } from "../helper/ui";
import { createUser, createConnection } from "../helper/model";

describe("Connection Tables(friend,in,out,deny)", () => {
  const lu = createUser("Lu Tran", "lu@us.com");
  const tu = createUser("Tu Nguyen", "tu@pr.com");

  it("can display connected-user", () => {
    cy.setupDb([lu, tu]);

    //in user
    const in_connection = createConnection(tu, lu, true, undefined);
    cy.insertConnections([in_connection]);
    cy.loadApp();
    cy.login(lu.email);
    tab.connection.focus();
    tab.connection.inConnection.focus();
    ui.connection.snap("Can display in connection");

    //out user
    cy.clearConnectionDb();
    const out_connection = createConnection(lu, tu, true, undefined);
    cy.insertConnections([out_connection]);
    cy.loadApp();
    tab.connection.focus();
    tab.connection.outConnection.focus();
    ui.connection.snap("Can display out connection");

    //friend user
    cy.clearConnectionDb();
    const friend_connection = createConnection(lu, tu, true, true);
    cy.insertConnections([friend_connection]);
    cy.loadApp();
    tab.connection.focus();
    tab.connection.friend.focus();
    ui.connection.snap("Can display friend connection");

    //in-deny user
    cy.clearConnectionDb();
    const in_deny_connection = createConnection(tu, lu, true, false);
    cy.insertConnections([in_deny_connection]);
    cy.loadApp();
    tab.connection.focus();
    tab.connection.deny.focus();
    ui.connection.snap("Can display in-deny connection");

    //out-deny user
    cy.clearConnectionDb();
    const out_deny_connection = createConnection(lu, tu, false, true);
    cy.insertConnections([out_deny_connection]);
    cy.loadApp();
    tab.connection.focus();
    tab.connection.deny.focus();
    ui.connection.snap("Can display out-deny connection");
  });

  it("can edit connection", () => {
    cy.setupDb([lu, tu]);

    //in-friend table can approve
    let con = createConnection(tu, lu, true, undefined);
    cy.insertConnections([con]);
    cy.loadApp();
    cy.login(lu.email);
    tab.connection.focus();
    tab.connection.inConnection.focus();
    ui.connection.snap("in_friend table can approve - before");
    ui.connection.inRequests_approve(0);
    ui.connection.snap("in_friend table can approve - 1");
    tab.connection.friend.focus();
    ui.connection.snap("in_friend table can approve - 2");

    //in-friend table can deny
    cy.clearConnectionDb();
    con = createConnection(tu, lu, true, undefined);
    cy.insertConnections([con]);
    cy.loadApp();
    tab.connection.focus();
    tab.connection.inConnection.focus();
    ui.connection.snap("in_friend table can deny - before");
    ui.connection.inRequests_deny(0);
    ui.connection.snap("in_friend table can deny - 1");
    tab.connection.deny.focus();
    ui.connection.snap("in_friend table can deny - 2");

    //friend table can remove
    cy.clearConnectionDb();
    con = createConnection(tu, lu, true, true);
    cy.insertConnections([con]);
    cy.loadApp();
    tab.connection.focus();
    tab.connection.friend.focus();
    ui.connection.snap("friend table can remove - before");
    ui.connection.friends_deny(0);
    ui.connection.snap("friend table can remove - 1");
    tab.connection.deny.focus();
    ui.connection.snap("friend table can remove - 2");

    //out friend table can remove
    cy.clearConnectionDb();
    con = createConnection(lu, tu, true, undefined);
    cy.insertConnections([con]);
    cy.loadApp();
    tab.connection.focus();
    tab.connection.outConnection.focus();
    ui.connection.snap("out-friend table can remove - before");
    ui.connection.outConnectionTable.deny(0);
    ui.connection.snap("out-friend table can remove - 1");
    tab.connection.deny.focus();
    ui.connection.snap("out-friend table can remove - 2");

    //deny table can undo
    cy.clearConnectionDb();
    con = createConnection(tu, lu, true, false);
    cy.insertConnections([con]);
    cy.loadApp();
    tab.connection.focus();
    tab.connection.deny.focus();
    ui.connection.snap("deny-friend table can undo - before");
    ui.connection.denyRequests_approve(0);
    ui.connection.snap("deny-friend table can undo - 1");
    tab.connection.friend.focus();
    ui.connection.snap("deny-friend table can undo - 2");
  });

  // it("LoadingIcon", () => {
  //   cy.setupDb([lu, tu]);

  //   //in-friend table can approve
  //   let con = createConnection(tu, lu, true, undefined);
  //   cy.insertConnections([con]);
  //   cy.loadApp();
  //   cy.login(lu.email);
  //   tab.connection.focus();
  //   tab.connection.inConnection.focus();
  //   ui.connection.inRequests_approve(0);
  //   ui.connection.snapRightAway("in_friend table can approve");

  //   //in-friend table can deny
  //   cy.clearConnectionDb();
  //   con = createConnection(tu, lu, true, undefined);
  //   cy.insertConnections([con]);
  //   cy.loadApp();
  //   tab.connection.focus();
  //   tab.connection.inConnection.focus();
  //   ui.connection.inRequests_deny(0);
  //   ui.connection.snapRightAway("in_friend table can deny");

  //   //friend table can remove
  //   cy.clearConnectionDb();
  //   con = createConnection(tu, lu, true, true);
  //   cy.insertConnections([con]);
  //   cy.loadApp();
  //   tab.connection.focus();
  //   tab.connection.friend.focus();
  //   ui.connection.friends_deny(0);
  //   ui.connection.snapRightAway("friend table can remove");

  //   //out friend table can remove
  //   cy.clearConnectionDb();
  //   con = createConnection(lu, tu, true, undefined);
  //   cy.insertConnections([con]);
  //   cy.loadApp();
  //   tab.connection.focus();
  //   tab.connection.outConnection.focus();
  //   ui.connection.outConnectionTable.deny(0);
  //   ui.connection.snapRightAway("out-friend table can remove");

  //   //deny table can undo
  //   cy.clearConnectionDb();
  //   con = createConnection(tu, lu, true, false);
  //   cy.insertConnections([con]);
  //   cy.loadApp();
  //   tab.connection.focus();
  //   tab.connection.deny.focus();
  //   ui.connection.denyRequests_approve(0);
  //   ui.connection.snapRightAway("deny-friend table can undo");
  // });
});
