const mongodb = require("mongodb");
const { ObjectID } = mongodb;

describe("Fixture Dev", () => {
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

  beforeEach(() => {
    cy.setupDB([u1, u2, me]);
    cy.loadApp();
  });

  it("insert fixture", () => {
    //1. 1 -> me <- 2 : me <-> 1
    cy.login(u1.email);
    search(me.email);
    cy.get("#createConnectionBtn").click();
    cy.switchUser(u2.email);
    search(me.email);
    cy.get("#createConnectionBtn").click();
    cy.switchUser(me.email);
    cy.get("#InFriendTable .ConnectionTableRow")
      .eq(0)
      .find(".ConnectionTableRowApproveBtn")
      .click();

    // 1 post, 2 post, me post
    cy.switchUser(u1.email);
    post("1", "1", true);
    cy.switchUser(me.email);
    post("me", "me", true);
    cy.switchUser(u2.email);
    post("2", "2", true);

    //switch back into me
    cy.switchUser(me.email);
  });
});

function search(email) {
  cy.get("#SearchByEmail-react>form>input:text")
    .clear()
    .type(`${email}{enter}`);
  cy.get("#SearchByEmail-react>form>input:submit").should("be.enabled"); //wait for search result
}

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
