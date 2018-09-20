const mongodb = require("mongodb");
const { ObjectID } = mongodb;
const { inPostTree } = require("../helper/ui_inPost");

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

describe("InPost", () => {
  const post = {
    id: new ObjectID(),
    user: tu.id,
    title: "title",
    description: "description",
    isActive: true
  };

  const inActivePost = {
    id: new ObjectID(),
    user: tu.id,
    title: "title",
    description: "description",
    isActive: false
  };

  it("tables (all, request, borrow, return) can display data correctly", () => {
    //no request and not active info
    cy.setupDb([lu, tu], [connection], [inActivePost]);
    cy.loadApp();
    cy.login(lu.email);
    inPostTree.tab.focus();
    inPostTree.snap("no request data and not active post");

    //no request and active info
    cy.clearPostDb();
    cy.insertPosts([post]);
    cy.loadApp();
    inPostTree.tab.focus();
    inPostTree.snap("no request data and active post");

    //with request info
    cy.insertShares([
      {
        post,
        borrower: lu,
        isApprove: undefined,
        isAwareApprove: false,
        isReturn: false,
        isAwareReturn: false
      }
    ]);
    cy.loadApp();
    inPostTree.tab.focus();
    inPostTree.snap("with request data");

    //with denied info
    cy.clearShareDb();
    cy.insertShares([
      {
        post,
        borrower: lu,
        isApprove: false,
        isAwareApprove: false,
        isReturn: false,
        isAwareReturn: false
      }
    ]);
    cy.loadApp();
    inPostTree.tab.focus();
    inPostTree.snap("with denied data");

    //with borrow and no-aware approve info
    cy.clearShareDb();
    cy.insertShares([
      {
        post,
        borrower: lu,
        isApprove: true,
        isAwareApprove: false,
        isReturn: false,
        isAwareReturn: false
      }
    ]);
    cy.loadApp();
    inPostTree.tab.focus();
    inPostTree.snap("with borrow and no-aware approve data");

    //with borrow and yes-aware approve info
    cy.clearShareDb();
    cy.insertShares([
      {
        post,
        borrower: lu,
        isApprove: true,
        isAwareApprove: true,
        isReturn: false,
        isAwareReturn: false
      }
    ]);
    cy.loadApp();
    inPostTree.tab.focus();
    inPostTree.snap("with borrow and yes-aware approve data");

    //with return info
    cy.clearShareDb();
    cy.insertShares([
      {
        post,
        borrower: lu,
        isApprove: true,
        isAwareApprove: true,
        isReturn: true,
        isAwareReturn: false
      }
    ]);
    cy.loadApp();
    inPostTree.tab.focus();
    inPostTree.snap("with return data");
  });

  it("tables(all, request, borrow, return) has buttons to make, undo, aware, return request", () => {
    //can make request
    cy.setupDb([lu, tu], [connection], [post]);
    cy.loadApp();
    cy.login(lu.email);
    inPostTree.tab.focus();
    inPostTree.request(post);
    inPostTree.snap("user can make request");

    //can undo request
    inPostTree.undoRequest(post);
    inPostTree.snap("user can undo request");

    //can aware
    cy.clearShareDb();
    cy.insertShares([
      {
        post,
        borrower: lu,
        isApprove: true,
        isAwareApprove: false,
        isReturn: false,
        isAwareReturn: false
      }
    ]);
    cy.loadApp();
    inPostTree.tab.focus();
    inPostTree.awareApprove(post);
    inPostTree.snap("user can aware approve");

    //can return
    cy.clearShareDb();
    cy.insertShares([
      {
        post,
        borrower: lu,
        isApprove: true,
        isAwareApprove: true,
        isReturn: false,
        isAwareReturn: false
      }
    ]);
    cy.loadApp();
    inPostTree.tab.focus();
    inPostTree.returnBorrow(post);
    inPostTree.snap("user can return borrow");
  });

  it("LoadingIcon", () => {
    const post = {
      id: new ObjectID(),
      user: tu.id,
      title: "title 1",
      description: "description 1",
      isActive: true
    };

    //main page
    cy.setupDb([lu, tu], [connection], [post]);
    cy.loadApp();
    cy.login(lu.email);
    inPostTree.waitForMainPageLoadingFinish();

    //all post table
    inPostTree.request(post);
    inPostTree.snapRightAway("all post table -> make request");

    //request table
    inPostTree.undoRequest(post);
    inPostTree.snapRightAway("request table -> undo request");

    //borrow table - aware
    cy.insertShares([
      {
        post: post,
        borrower: lu,
        isApprove: true,
        isAwareApprove: false,
        isReturn: false,
        isAwareReturn: false
      }
    ]);
    cy.loadApp();
    inPostTree.awareApprove(post);
    inPostTree.snapRightAway("borrow table -> aware");

    //borrow table - return
    cy.clearShareDb();
    cy.insertShares([
      {
        post: post,
        borrower: lu,
        isApprove: true,
        isAwareApprove: true,
        isReturn: false,
        isAwareReturn: false
      }
    ]);
    cy.loadApp();
    inPostTree.returnBorrow(post);
    inPostTree.snapRightAway("borrow table -> return");
  });
});
