const mongodb = require("mongodb");
const { ObjectID } = mongodb;
const { tree } = require("../helper");

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
    tree.outPost.tab.focus();
    tree.outPost.table.snap("app show empty OutPost");

    //user can post
    tree.outPost.createNewPost();
    tree.outPost.crudDialog.snap("app show empty post form");
    tree.outPost.crudDialog.fillOut("me title", "me description", true);
    tree.outPost.crudDialog.snap("app show fill out form");
    tree.outPost.crudDialog.submit();
    tree.outPost.table.snap("app's outPostTable show new created post");

    tree.outPost.table.edit(0);
    tree.outPost.crudDialog.snap("app show pre-filled post form with edit");
    tree.outPost.crudDialog.fillOut(
      "new me title",
      "new me description",
      false
    );
    tree.outPost.crudDialog.submit();
    tree.outPost.table.snap("app's outPostTable show edited post");
  });
});
