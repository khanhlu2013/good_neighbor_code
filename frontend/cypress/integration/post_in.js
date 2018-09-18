const mongodb = require("mongodb");
const { ObjectID } = mongodb;
const { inPostTree } = require("../helper/ui_inPost");

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
const connection = {
  from: lu._id,
  to: tu._id,
  approvedByTo: true,
  approvedByFrom: true
};

describe("InPost feature", () => {
  const post = {
    _id: new ObjectID(),
    user: tu._id,
    title: "title",
    description: "description",
    isActive: true
  };

  it("has inpost tables can display data correctly", () => {
    //no request info
    cy.setupDb([lu, tu], [connection], [post]);
    cy.loadApp();
    cy.login(lu.email);
    inPostTree.tab.focus();
    inPostTree.snap("no request data");

    //with request info
    cy.insertShares([
      {
        post,
        borrower: lu,
        isApprovedByFrom: undefined,
        isReturnedByTo: false
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
        isApprovedByFrom: false,
        isReturnedByTo: false
      }
    ]);
    cy.loadApp();
    inPostTree.tab.focus();
    inPostTree.snap("with denied data");

    //with borrowed info
    cy.clearShareDb();
    cy.insertShares([
      {
        post,
        borrower: lu,
        isApprovedByFrom: true,
        isReturnedByTo: false
      }
    ]);
    cy.loadApp();
    inPostTree.tab.focus();
    inPostTree.snap("with borrowed data");

    //with returned info
    cy.clearShareDb();
    cy.insertShares([
      {
        post,
        borrower: lu,
        isApprovedByFrom: true,
        isReturnedByTo: true
      }
    ]);
    cy.loadApp();
    inPostTree.tab.focus();
    inPostTree.snap("with returned data");
  });

  it("tables has buttons to make request, undo request, return borrowed", () => {
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

    //can return
    cy.clearShareDb();
    cy.insertShares([
      {
        post,
        borrower: lu,
        isApprovedByFrom: true,
        isReturnedByTo: false
      }
    ]);
    cy.loadApp();
    inPostTree.tab.focus();
    inPostTree.returnBorrow(post);
    inPostTree.snap("user can return borrowed");
  });

  it("has loadingIcon", () => {
    const post = {
      _id: new ObjectID(),
      user: tu._id,
      title: "title 1",
      description: "description 1",
      isActive: true
    };

    //main page
    cy.setupDb([lu, tu], [connection], [post]);
    cy.loadApp();
    cy.login(lu.email);
    inPostTree.snapRightAway("main page");

    //all post table
    inPostTree.request(post);
    inPostTree.snapRightAway("all post table");

    //request table
    inPostTree.undoRequest(post);
    inPostTree.snapRightAway("request table");

    //borrowed table
    cy.clearShareDb();
    cy.insertShares([
      {
        post: post,
        borrower: lu,
        isApprovedByFrom: true,
        isReturnedByTo: false
      }
    ]);
    cy.loadApp();
    inPostTree.returnBorrow(post);
    inPostTree.snapRightAway("borrowed table");
  });
});
