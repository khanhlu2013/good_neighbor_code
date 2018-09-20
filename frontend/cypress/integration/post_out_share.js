const mongodb = require("mongodb");
const { ObjectID } = mongodb;
const { outPostTree } = require("../helper/ui_outPost");

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
const connection = {
  from: lu.id,
  to: tu.id,
  approvedByTo: true,
  approvedByFrom: true
};

const post = {
  id: new ObjectID(),
  user: lu.id,
  title: "title",
  description: "description",
  isActive: true
};

describe("Outpost share ", () => {
  it("table can display request,borrow,deny,return info", () => {
    //no share data
    cy.setupDb([lu, tu], [connection], [post]);
    cy.loadApp();
    cy.login(lu.email);

    outPostTree.tab.focus();
    outPostTree.snap(
      "table can show post with no request, no approved,no denied info"
    );

    //request
    cy.clearShareDb();
    cy.insertShares([
      {
        post,
        borrower: tu,
        isApprove: undefined,
        isAwareApprove: false,
        isReturn: false,
        isAwareReturn: false
      }
    ]);

    cy.loadApp();
    outPostTree.tab.focus();
    outPostTree.snap("table can show post with request");

    //approved
    cy.clearShareDb();
    cy.insertShares([
      {
        post,
        borrower: tu,
        isApprove: true,
        isAwareApprove: false,
        isReturn: false,
        isAwareReturn: false
      }
    ]);

    cy.loadApp();
    outPostTree.tab.focus();
    outPostTree.snap("table can show post with approved info");

    //denied
    cy.clearShareDb();
    cy.insertShares([
      {
        post,
        borrower: tu,
        isApprove: false,
        isAwareApprove: false,
        isReturn: false,
        isAwareReturn: false
      }
    ]);

    cy.loadApp();
    outPostTree.tab.focus();
    outPostTree.snap("table can show post with denied info");

    //return
    cy.clearShareDb();
    cy.insertShares([
      {
        post,
        borrower: tu,
        isApprove: true,
        isAwareApprove: true,
        isReturn: true,
        isAwareReturn: false
      }
    ]);

    cy.loadApp();
    outPostTree.tab.focus();
    outPostTree.snap("table can show post with return info");
  });

  it("dialog can approve deny and undo share info", () => {
    const share = {
      post,
      borrower: tu,
      isApprove: undefined,
      isReturn: false
    };

    cy.setupDb([lu, tu], [connection], [post], [share]);
    cy.loadApp();
    cy.login(lu.email);

    outPostTree.tab.focus();
    outPostTree.table.decide(post);

    //approve request
    outPostTree.decisionDialog.decide(tu, true);
    outPostTree.decisionDialog.snap("Dialog can approve request");

    //undo approve
    outPostTree.decisionDialog.undoApprove();
    outPostTree.decisionDialog.snap("Dialog can undo approved");

    //deny request
    outPostTree.decisionDialog.decide(tu, false);
    outPostTree.decisionDialog.snap("Dialog can deny request");

    //undo denied
    outPostTree.decisionDialog.undoDenied(tu);
    outPostTree.decisionDialog.snap("Dialog can undo denied request");
  });

  it("LoadingIcon", () => {
    const share = {
      post,
      borrower: tu,
      isApprove: undefined,
      isReturn: false
    };

    cy.setupDb([lu, tu], [connection], [post], [share]);
    cy.loadApp();
    cy.login(lu.email);
    outPostTree.tab.focus();
    outPostTree.waitForMainPageLoadingFinish();
    outPostTree.table.decide(post);

    //approve request
    outPostTree.decisionDialog.decide(tu, true);
    outPostTree.decisionDialog.snapRightAway("approving ...");

    //undo approve
    outPostTree.decisionDialog.undoApprove();
    outPostTree.decisionDialog.snapRightAway("undo approved ...");

    //deny request
    outPostTree.decisionDialog.decide(tu, false);
    outPostTree.decisionDialog.snapRightAway("deny request ...");

    //undo denied
    outPostTree.decisionDialog.undoDenied(tu);
    outPostTree.decisionDialog.snapRightAway("undo denied request ...");
  });
});
