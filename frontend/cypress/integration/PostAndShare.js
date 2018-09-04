const mongodb = require("mongodb");
const { ObjectID } = mongodb;

describe("Post and Share", () => {
  const me = {
    _id: new ObjectID(),
    email: "me@me.com",
    name: "Me Here"
  };

  it("can create and edit post", () => {
    cy.setupDB([me]);
    cy.loadApp();
    cy.login(me.email);

    //app show empty out post
    snapOutPostTable("app show empty OutPost");

    //user can post
    postForm.open();
    postForm.snap("app show empty post form");
    postForm.fillOut("me title", "me description", true);
    postForm.snap("app show fill out form");
    postForm.submit();
    snapOutPostTable("app's outPostTable show new created post");

    inPost_Edit(0);
    postForm.snap("app show pre-filled post form with edit");
    postForm.fillOut("new me title", "new me description", false);
    postForm.submit();
    snapOutPostTable("app's outPostTable show edited post");
  });

  it("works", () => {
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
    const conn_me_u1 = {
      from: u1._id,
      to: me._id,
      approvedByTo: true,
      approvedByFrom: true
    };
    const p1 = {
      user: u1._id,
      title: "title 1",
      description: "description 1",
      isActive: true
    };
    const p2 = {
      user: u2._id,
      title: "title 2",
      description: "description 2",
      isActive: true
    };

    cy.setupDB([u1, u2, me], [conn_me_u1], [p1, p2]);
    cy.loadApp();
    cy.login(me.email);
    //app can display InPosts list
    snapInPostTable("app can display InPosts");

    //user can make a request to borrow
    inPosts_makeRequest(0);
    snapInPostTable("user can make a request to borrow");

    //user can undo a request to borrow
    inShareRequesting_Undo(0);
    snapInPostTable("user can undo a request");

    //lets borrow again and switch to user 1 to approve
    inPosts_makeRequest(0);
    cy.switchUser(u1.email);
    snapOutPostTable("requesting table display correctly");
  });
});

const postForm = {
  open: () => {
    cy.get("#createPostBtn").click();
  },
  snap: name => {
    cy.get("#OutPostCrudDialogForm-react").snapshot({ name });
  },
  fillOut: (title, description, isActive) => {
    cy.get("#OutPostCrudDialogForm-react>:text")
      .clear()
      .type(`${title}`);
    cy.get("#OutPostCrudDialogForm-react>textarea")
      .clear()
      .type(`${description}`);
    const isActiveCheckBox = cy.get("#OutPostCrudDialogForm-react :checkbox");
    if (isActive) {
      isActiveCheckBox.check();
    } else {
      isActiveCheckBox.uncheck();
    }
  },
  submit: () => {
    cy.get("#OutPostCrudDialogForm-react>:submit").click();
  }
};

function snapInPostTable(name) {
  cy.contains("Refreshing in posts ...").should("not.be.visible");
  cy.get("#InPostManagement-react").snapshot({ name });
}

function snapOutPostTable(name) {
  cy.contains("refreshing out posts ...").should("not.be.visible");
  cy.get("#OutPostManagement-react").snapshot({ name });
}

function inPosts_makeRequest(rowIndex) {
  cy.get("#InPostTable-react .InPostTableRow")
    .eq(rowIndex)
    .find(".InPostTableRowBorrowBtn")
    .click();
}

function inShareRequesting_Undo(rowIndex) {
  cy.get("#InShareRequestingTable-react .InShareRequestingTableRow")
    .eq(0)
    .find(".InShareRequestingTableRowUndoBtn")
    .click();
}

function inPost_Edit(rowIndex) {
  cy.get("#OutPostTable-react .OutPostTableRow")
    .eq(0)
    .find(".OutPostTableRowEditBtn")
    .click();
}
