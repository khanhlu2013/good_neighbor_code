const mongodb = require("mongodb");
const { ObjectID } = mongodb;

describe("Post and Share", () => {
  const u1 = {
    _id: new ObjectID(),
    email: "1@1.com",
    name: "User One"
  };
  const u2 = {
    _id: new ObjectID(),
    email: "2@2.com",
    name: "User Two"
  };
  const me = {
    _id: new ObjectID(),
    email: "me@me.com",
    name: "Me Here"
  };
  const conn_me_u1 = {
    from: u1._id,
    to: me._id,
    approvedByTo: true,
    approvedByFrom: true
  };
  const p1 = {
    by: u1._id,
    title: "title 1",
    description: "description 1",
    isActive: true
  };
  const p2 = {
    by: u2._id,
    title: "title 2",
    description: "description 2",
    isActive: true
  };
  beforeEach(() => {
    cy.setupDB([u1, u2, me], [conn_me_u1], [p1, p2]);
  });

  it("works", () => {
    cy.loadApp();
    cy.login(me.email);
    //app can display InPosts list
    snapInPosts("app can display InPosts");

    //user can create post
    post("me title", "me description", true);
    snapOutPosts("user can create an OutPost");

    //user can make a request to borrow
    inPosts_makeRequest(0);
    snapInPosts("user can make a request to borrow");

    //user can undo a request to borrow
    inPosts_makeRequestUndo(0);
    snapInPosts("user can undo a request");

    //lets borrow again and switch to user 1 to approve
    inPosts_makeRequest(0);
    cy.switchUser(u1.email);
    snapOutPosts("requesting table display correctly");
  });
});

function post(title, description, isActive) {
  cy.get("#createPostBtn").click();
  cy.get("#OutPostDialogForm-react>:text").type(`${title}`);
  cy.get("#OutPostDialogForm-react>textarea").type(`${description}`);
  const isActiveCheckBox = cy.get("#OutPostDialogForm-react :checkbox");
  if (isActive) {
    isActiveCheckBox.check();
  } else {
    isActiveCheckBox.uncheck();
  }
  cy.get("#OutPostDialogForm-react>:submit").click();
}

function snapInPosts(name) {
  cy.contains("Refreshing in posts ...").should("not.be.visible");
  cy.get("#InPostManagement-react").snapshot({ name });
}

function snapOutPosts(name) {
  cy.contains("refreshing out posts ...").should("not.be.visible");
  cy.get("#OutPostManagement-react").snapshot({ name });
}

function inPosts_makeRequest(rowIndex) {
  cy.get("#InPostAllTable-react .InPostAllTableRow")
    .eq(rowIndex)
    .find(".InPostAllTableRowBorrowBtn")
    .click();
}

function inPosts_makeRequestUndo(rowIndex) {
  cy.get("#InPostRequestingTable-react .InPostRequestingTableRow")
    .eq(0)
    .find(".InPostRequestingTableRowUndoBtn")
    .click();
}
