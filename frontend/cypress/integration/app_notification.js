const mongodb = require("mongodb");
const { ObjectID } = mongodb;

import { ui } from "../helper/ui_app";

describe("Notification", () => {
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

  it("can display", () => {
    //friend request
    cy.setupDb(
      [lu, tu],
      [
        {
          from: tu.id,
          to: lu.id,
          approvedByTo: undefined,
          approvedByFrom: true
        }
      ]
    );
    cy.loadApp();
    cy.login(lu.email);

    ui.tab.connection.snap("friend request");

    //post request
    cy.clearConnectionDb();
    cy.insertConnections([
      {
        from: tu.id,
        to: lu.id,
        approvedByTo: true,
        approvedByFrom: true
      }
    ]);
    const post = {
      id: new ObjectID(),
      user: lu.id,
      title: "t",
      description: "d",
      isActive: true
    };
    cy.insertPosts([post]);
    cy.insertShares([
      {
        post,
        borrower: tu,
        isApprove: undefined
      }
    ]);
    cy.loadApp();
    cy.get("#PrivateApp-react").should("be.visible");
    ui.tab.outPost.snap("post request");

    //unaware approve share
    cy.clearShareDb();
    cy.insertShares([
      {
        post,
        borrower: tu,
        isApprove: true,
        isAwareApprove: false
      }
    ]);
    cy.switchUser(tu.email);
    ui.tab.inPost.snap("unaware approve share");
  });

  it("can update friend request ", () => {
    //friend request
    cy.setupDb(
      [lu, tu],
      [
        {
          from: tu.id,
          to: lu.id,
          approvedByTo: undefined,
          approvedByFrom: true
        }
      ]
    );
    cy.loadApp();
    cy.login(lu.email);
    ui.tab.connection.focus();
    ui.connectionUi.inRequests_approve(0);
    ui.tab.connection.snap("update friend request");
  });

  it("can update post request ", () => {
    const connection = {
      from: tu.id,
      to: lu.id,
      approvedByTo: true,
      approvedByFrom: true
    };
    const post = {
      id: new ObjectID(),
      user: lu.id,
      title: "t",
      description: "d",
      isActive: true
    };
    const share = {
      post,
      borrower: tu,
      isApprove: undefined
    };

    cy.setupDb([lu, tu], [connection], [post], [share]);
    cy.loadApp();
    cy.login(lu.email);
    ui.tab.outPost.focus();
    ui.outpostUi.table.decide(post);
    ui.outpostUi.decisionDialog.decide(tu, true);
    ui.outpostUi.decisionDialog.exit();
    ui.outpostUi.tab.snap("update post request");
  });

  it("can update unaware approve share", () => {
    const connection = {
      from: tu.id,
      to: lu.id,
      approvedByTo: true,
      approvedByFrom: true
    };
    const post = {
      id: new ObjectID(),
      user: lu.id,
      title: "t",
      description: "d",
      isActive: true
    };
    const share = {
      post,
      borrower: tu,
      isApprove: true,
      isAwareApprove: false,
      isReturn: false,
      isAwareReturn: false
    };

    cy.setupDb([lu, tu], [connection], [post], [share]);
    cy.loadApp();
    cy.login(tu.email);
    ui.tab.inPost.focus();
    ui.inPostUi.tab.all.awareApprove(post);
    ui.tab.inPost.snap("update unaware share");
  });
});
