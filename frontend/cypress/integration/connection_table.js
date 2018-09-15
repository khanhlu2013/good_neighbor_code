const mongodb = require("mongodb");
const { ObjectID } = mongodb;

const { connectionTree } = require("../helper/ui_connection");

describe("Connection Tables Component", () => {
  const lu = {
    _id: new ObjectID(),
    email: "lu@us.com",
    name: "Lu Tran"
  };
  const tu = {
    _id: new ObjectID(),
    email: "tu@pr.com",
    name: "Tu Nguyen"
  };

  it("can display connected-user", () => {
    cy.setupDb([lu, tu]);

    //in user
    const in_connection = {
      from: tu._id,
      to: lu._id,
      approvedByTo: undefined,
      approvedByFrom: true
    };
    cy.insertConnections([in_connection]);
    cy.loadApp();
    cy.login(lu.email);
    connectionTree.tab.focus();
    connectionTree.snap("Can display in connection");

    //out user
    cy.clearConnectionDb();
    const out_connection = {
      from: lu._id,
      to: tu._id,
      approvedByTo: undefined,
      approvedByFrom: true
    };
    cy.insertConnections([out_connection]);
    cy.loadApp();
    connectionTree.tab.focus();
    connectionTree.snap("Can display out connection");

    //friend user
    cy.clearConnectionDb();
    const friend_connection = {
      from: lu._id,
      to: tu._id,
      approvedByTo: true,
      approvedByFrom: true
    };
    cy.insertConnections([friend_connection]);
    cy.loadApp();
    connectionTree.tab.focus();
    connectionTree.snap("Can display friend connection");

    //in-deny user
    cy.clearConnectionDb();
    const in_deny_connection = {
      from: lu._id,
      to: tu._id,
      approvedByTo: false,
      approvedByFrom: true
    };
    cy.insertConnections([in_deny_connection]);
    cy.loadApp();
    connectionTree.tab.focus();
    connectionTree.snap("Can display in-deny connection");

    //out-deny user
    cy.clearConnectionDb();
    const out_deny_connection = {
      from: lu._id,
      to: tu._id,
      approvedByTo: true,
      approvedByFrom: false
    };
    cy.insertConnections([out_deny_connection]);
    cy.loadApp();
    connectionTree.tab.focus();
    connectionTree.snap("Can display out-deny connection");
  });

  it("can edit connection", () => {
    cy.setupDb([lu, tu]);

    //in-friend table can approve
    cy.insertConnections([
      {
        from: tu._id,
        to: lu._id,
        approvedByTo: undefined,
        approvedByFrom: true
      }
    ]);
    cy.loadApp();
    cy.login(lu.email);
    connectionTree.tab.focus();
    connectionTree.inRequests_approve(0);
    connectionTree.snap("in_friend table can approve");

    //in-friend table can deny
    cy.clearConnectionDb();
    cy.insertConnections([
      {
        from: tu._id,
        to: lu._id,
        approvedByTo: undefined,
        approvedByFrom: true
      }
    ]);
    cy.loadApp();
    connectionTree.tab.focus();
    connectionTree.inRequests_deny(0);
    connectionTree.snap("in_friend table can deny");

    //friend table can remove
    cy.clearConnectionDb();
    cy.insertConnections([
      {
        from: tu._id,
        to: lu._id,
        approvedByTo: true,
        approvedByFrom: true
      }
    ]);
    cy.loadApp();
    connectionTree.tab.focus();
    connectionTree.friends_deny(0);
    connectionTree.snap("friend table can remove");

    //out friend table can remove
    cy.clearConnectionDb();
    cy.insertConnections([
      {
        from: lu._id,
        to: tu._id,
        approvedByTo: undefined,
        approvedByFrom: true
      }
    ]);
    cy.loadApp();
    connectionTree.tab.focus();
    connectionTree.outRequests_deny(0);
    connectionTree.snap("out-friend table can remove");

    //deny table can undo
    cy.clearConnectionDb();
    cy.insertConnections([
      {
        from: tu._id,
        to: lu._id,
        approvedByTo: false,
        approvedByFrom: true
      }
    ]);
    cy.loadApp();
    connectionTree.tab.focus();
    connectionTree.denyRequests_approve(0);
    connectionTree.snap("deny-friend table can undo");
  });

  it("can show LoadingIcon when editing connection", () => {
    cy.setupDb([lu, tu]);

    //in-friend table can approve
    cy.insertConnections([
      {
        from: tu._id,
        to: lu._id,
        approvedByTo: undefined,
        approvedByFrom: true
      }
    ]);
    cy.loadApp();
    cy.login(lu.email);
    connectionTree.tab.focus();
    connectionTree.inRequests_approve(0);
    connectionTree.snapRightAway("in_friend table can approve");

    //in-friend table can deny
    cy.clearConnectionDb();
    cy.insertConnections([
      {
        from: tu._id,
        to: lu._id,
        approvedByTo: undefined,
        approvedByFrom: true
      }
    ]);
    cy.loadApp();
    connectionTree.tab.focus();
    connectionTree.inRequests_deny(0);
    connectionTree.snapRightAway("in_friend table can deny");

    //friend table can remove
    cy.clearConnectionDb();
    cy.insertConnections([
      {
        from: tu._id,
        to: lu._id,
        approvedByTo: true,
        approvedByFrom: true
      }
    ]);
    cy.loadApp();
    connectionTree.tab.focus();
    connectionTree.friends_deny(0);
    connectionTree.snapRightAway("friend table can remove");

    //out friend table can remove
    cy.clearConnectionDb();
    cy.insertConnections([
      {
        from: lu._id,
        to: tu._id,
        approvedByTo: undefined,
        approvedByFrom: true
      }
    ]);
    cy.loadApp();
    connectionTree.tab.focus();
    connectionTree.outRequests_deny(0);
    connectionTree.snapRightAway("out-friend table can remove");

    //deny table can undo
    cy.clearConnectionDb();
    cy.insertConnections([
      {
        from: tu._id,
        to: lu._id,
        approvedByTo: false,
        approvedByFrom: true
      }
    ]);
    cy.loadApp();
    connectionTree.tab.focus();
    connectionTree.denyRequests_approve(0);
    connectionTree.snapRightAway("deny-friend table can undo");
  });
});
