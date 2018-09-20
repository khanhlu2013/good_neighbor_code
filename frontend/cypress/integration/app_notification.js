const mongodb = require("mongodb");
const { ObjectID } = mongodb;

import { connectionTree } from "../helper/ui_connection";
import { outPostTree } from "../helper/ui_outPost";
import { inPostTree } from "../helper/ui_inPost";

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
    connectionTree.tab.snap("friend request");

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
    outPostTree.tab.snap("post request");

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
    inPostTree.tab.snap("unaware approve share");
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
    connectionTree.tab.focus();
    connectionTree.inRequests_approve(0);
    connectionTree.tab.snap("update friend request");
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
    outPostTree.tab.focus();
    outPostTree.table.decide(post);
    outPostTree.decisionDialog.decide(tu, true);
    outPostTree.decisionDialog.exit();
    outPostTree.tab.snap("update post request");
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
    inPostTree.tab.focus();
    inPostTree.awareApprove(post);
    inPostTree.tab.snap("update unaware share");
  });
});
