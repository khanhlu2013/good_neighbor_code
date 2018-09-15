const mongodb = require("mongodb");
const { ObjectID } = mongodb;
const { outPostTree } = require("../helper_outPost");

describe("Post", () => {
  it("can create and edit post", () => {
    const me = {
      _id: new ObjectID(),
      email: "me@me.com",
      name: "Me Here"
    };

    cy.setupDb([me]);
    cy.loadApp();
    cy.login(me.email);

    //app show empty out post
    outPostTree.tab.focus();
    outPostTree.table.snap("app show empty OutPost");

    //user can post
    outPostTree.createNewPost();
    outPostTree.crudDialog.snap("app show empty post form");
    outPostTree.crudDialog.fillOut("me title", "me description", true);
    outPostTree.crudDialog.snap("app show fill out form");
    outPostTree.crudDialog.submit();
    outPostTree.table.snap("app's outPostTable show new created post");

    outPostTree.table.edit(0);
    outPostTree.crudDialog.snap("app show pre-filled post form with edit");
    outPostTree.crudDialog.fillOut("new me title", "new me description", false);
    outPostTree.crudDialog.submit();
    outPostTree.table.snap("app's outPostTable show edited post");
  });
});
