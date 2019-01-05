import { ui, tab } from "../helper/ui";
import { createUser, createPost } from "../helper/model";

const me = createUser("Me Here", "me@me.com");

describe("OutPost crud", () => {
  it("can create and edit post", () => {
    cy.setupDb([me]);
    cy.loadApp();
    cy.login(me.email);

    let post = createPost(me, "me title", "me description");
    let editPost = createPost(me, "new me title", "new me description", false);

    // app show empty out post
    tab.outPost.focus();
    ui.outPost.list.all.snap("app show empty OutPost");

    //user can post
    ui.outPost.createNewPost();
    ui.outPost.crudDialog.snap("app show empty post form");
    ui.outPost.crudDialog.fillOut(post);
    ui.outPost.crudDialog.snap("app show fill out form");
    ui.outPost.crudDialog.submit();
    ui.outPost.crudDialog.waitForLoadingFinish();
    ui.outPost.list.all.snap("app's outPostTable show new created post");

    //user can edit post
    ui.outPost.list.all.edit(post);
    ui.outPost.crudDialog.snap("app show pre-filled post form with edit");
    ui.outPost.crudDialog.fillOut(editPost);
    ui.outPost.crudDialog.submit();
    ui.outPost.crudDialog.waitForLoadingFinish();
    ui.outPost.list.all.snap("app's outPostTable show edited post");
  });
});
