const mongodb = require("mongodb");
const { ObjectID } = mongodb;

describe("Post", () => {
  it("can create and edit post", () => {
    const me = {
      _id: new ObjectID(),
      email: "me@me.com",
      name: "Me Here"
    };

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

    outPostTable_Edit(0);
    postForm.snap("app show pre-filled post form with edit");
    postForm.fillOut("new me title", "new me description", false);
    postForm.submit();
    snapOutPostTable("app's outPostTable show edited post");
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

function snapOutPostTable(name) {
  cy.contains("refreshing out posts ...").should("not.be.visible");
  cy.get("#OutPostManagement-react").snapshot({ name });
}

function outPostTable_Edit(rowIndex) {
  cy.get("#OutPostTable-react .OutPostTableRow")
    .eq(0)
    .find(".OutPostTableRowEditBtn")
    .click();
}
