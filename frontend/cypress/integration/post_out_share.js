import { ui, tab } from "../helper/ui";
import {
  createUser,
  createPost,
  createConnection,
  createShare
} from "../helper/model";

const lu = createUser("Lu Tran", "lu@us.com");
const tu = createUser("Tu Nguyen", "tu@pr.com");
const connection = createConnection(lu, tu, true, true);
const post = createPost(lu, "p title", "p description");

describe("Outpost share ", () => {
  it("table can display request,borrow,deny,return info", () => {
    //no share data
    cy.setupDb([lu, tu], [connection], [post]);
    cy.loadApp();
    cy.login(lu.email);

    tab.outPost.focus();
    ui.outPost.list.all.snap(
      "table can show post with no request, no approved,no denied info"
    );

    //request
    cy.clearShareDb();
    let share = createShare(post, tu);
    cy.insertShares([share]);

    cy.loadApp();
    tab.outPost.focus();
    ui.outPost.list.all.snap("table can show post with request");

    //approved
    cy.clearShareDb();
    share = createShare(post, tu, true);
    cy.insertShares([share]);

    cy.loadApp();
    tab.outPost.focus();
    ui.outPost.list.all.snap("table can show post with approved info");

    //denied
    cy.clearShareDb();
    share = createShare(post, tu, false);
    cy.insertShares([share]);

    cy.loadApp();
    tab.outPost.focus();
    ui.outPost.list.all.snap("table can show post with denied info");

    //return
    cy.clearShareDb();
    share = createShare(post, tu, true, true, true, true, new Date());
    cy.insertShares([share]);

    cy.loadApp();
    tab.outPost.focus();
    ui.outPost.list.all.snap("table can show post with return info");
  });

  it("dialog can approve deny and undo share info", () => {
    const share = createShare(post, tu);
    cy.setupDb([lu, tu], [connection], [post], [share]);
    cy.loadApp();
    cy.login(lu.email);

    tab.outPost.focus();
    ui.outPost.list.all.decide(post);

    //approve request
    ui.outPost.decisionDialog.decide(tu, true);
    ui.outPost.decisionDialog.snap("Dialog can approve request");

    //undo approve
    ui.outPost.decisionDialog.undoApprove();
    ui.outPost.decisionDialog.snap("Dialog can undo approved");

    //deny request
    ui.outPost.decisionDialog.decide(tu, false);
    ui.outPost.decisionDialog.snap("Dialog can deny request");

    //undo denied
    ui.outPost.decisionDialog.undoDenied(tu);
    ui.outPost.decisionDialog.snap("Dialog can undo denied request");
  });

  // it("LoadingIcon", () => {
  //   const share = createShare(post, tu);
  //   cy.setupDb([lu, tu], [connection], [post], [share]);
  //   cy.loadApp();
  //   cy.login(lu.email);
  //   tab.outPost.focus();
  //   ui.outPost.waitForMainPageLoadingFinish();
  //   ui.outPost.list.all.decide(post);

  //   //approve request
  //   ui.outPost.decisionDialog.decide(tu, true);
  //   ui.outPost.decisionDialog.snapRightAway("approving ...");

  //   //undo approve
  //   ui.outPost.decisionDialog.undoApprove();
  //   ui.outPost.decisionDialog.snapRightAway("undo approved ...");

  //   //deny request
  //   ui.outPost.decisionDialog.decide(tu, false);
  //   ui.outPost.decisionDialog.snapRightAway("deny request ...");

  //   //undo denied
  //   ui.outPost.decisionDialog.undoDenied(tu);
  //   ui.outPost.decisionDialog.snapRightAway("undo denied request ...");
  // });
});
