const mongodb = require("mongodb");
const { ObjectID } = mongodb;
const { outPostTree } = require("../helper/ui_outPost");

const me = {
  id: new ObjectID(),
  email: "me@me.com",
  name: "Me Here"
};

describe("OutPost crud", () => {
  it("can create and edit post", () => {
    cy.setupDb([me]);
    cy.loadApp();
    cy.login(me.email);

    // app show empty out post
    outPostTree.tab.focus();
    outPostTree.snap("app show empty OutPost");

    //user can post
    outPostTree.createNewPost();
    outPostTree.crudDialog.snapRightAway("app show empty post form");
    outPostTree.crudDialog.fillOut("me title", "me description", true);
    outPostTree.crudDialog.snapRightAway("app show fill out form");
    outPostTree.crudDialog.submit();
    outPostTree.crudDialog.waitForLoadingFinish();
    outPostTree.snap("app's outPostTable show new created post");

    outPostTree.table.edit(0);
    outPostTree.crudDialog.snapRightAway(
      "app show pre-filled post form with edit"
    );
    outPostTree.crudDialog.fillOut("new me title", "new me description", false);
    outPostTree.crudDialog.submit();
    outPostTree.crudDialog.waitForLoadingFinish();
    outPostTree.snap("app's outPostTable show edited post");
  });

  it("LoadingIcon", () => {
    cy.setupDb([me]);
    cy.loadApp();
    cy.login(me.email);
    outPostTree.tab.focus();
    outPostTree.waitForMainPageLoadingFinish();

    //loading icon when create new
    outPostTree.createNewPost();
    outPostTree.crudDialog.fillOut("me title", "me description", true);
    outPostTree.crudDialog.submit();
    outPostTree.crudDialog.snapRightAway(
      "crud dialog show loading icon when create new post"
    );
    outPostTree.crudDialog.waitForLoadingFinish();

    //loading icon when edit
    outPostTree.table.edit(0);
    outPostTree.crudDialog.fillOut("new me title", "new me description", false);
    outPostTree.crudDialog.submit();
    outPostTree.crudDialog.snapRightAway(
      "crud dialog show loading icon when edit post"
    );
  });
});
