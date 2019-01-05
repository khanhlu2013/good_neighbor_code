import { ui, tab } from "../helper/ui";
import {
  createUser,
  createConnection,
  createPost,
  createShare
} from "../helper/model";

const lu = createUser("Lu Tran", "lu@us.com");
const tu = createUser("Tu Nguyen", "tu@pr.com");
const connection = createConnection(lu, tu, true, true);

describe("InPost", () => {
  const post = createPost(tu, "active post", "active description");
  const inActivePost = createPost(
    tu,
    "unactive post",
    "unactive description",
    false
  );

  it("tables (all, request, borrow, return) can display static data correctly", () => {
    //no request and not active info
    cy.setupDb([lu, tu], [connection], [inActivePost]);
    cy.loadApp();
    cy.login(lu.email);
    tab.inPost.focus();
    ui.inPost.snap("no request data and not active post");

    //no request and active info
    cy.clearPostDb();
    cy.insertPosts([post]);
    cy.loadApp();
    tab.inPost.focus();
    ui.inPost.snap("no request data and active post");

    //with request info
    let share = createShare(post, lu);
    cy.insertShares([share]);
    cy.loadApp();
    tab.inPost.focus();
    ui.inPost.snap("with request data");

    //with denied info
    cy.clearShareDb();
    share = createShare(post, lu, false);
    cy.insertShares([share]);
    cy.loadApp();
    tab.inPost.focus();
    ui.inPost.snap("with denied data");

    //with borrow and no-aware approve info
    cy.clearShareDb();
    share = createShare(post, lu, true);
    cy.insertShares([share]);
    cy.loadApp();
    tab.inPost.focus();
    ui.inPost.snap("with borrow and no-aware approve data");

    //with borrow and yes-aware approve info
    cy.clearShareDb();
    share = createShare(post, lu, true, true);
    cy.insertShares([share]);
    cy.loadApp();
    tab.inPost.focus();
    ui.inPost.snap("with borrow and yes-aware approve data");

    //with return info
    cy.clearShareDb();
    share = createShare(post, lu, true, true, true);
    cy.insertShares([share]);
    cy.loadApp();
    tab.inPost.focus();
    ui.inPost.snap("with return data");
  });

  it("user can request, undo request, aware, return post", () => {
    //can make request
    cy.setupDb([lu, tu], [connection], [post]);
    cy.loadApp();
    cy.login(lu.email);
    tab.inPost.focus();
    ui.inPost.list.all.request(post);
    ui.inPost.snap("user can make request");

    //can undo request
    ui.inPost.list.all.undoRequest(post);
    ui.inPost.snap("user can undo request");

    //can aware
    cy.clearShareDb();
    let share = createShare(post, lu, true);
    cy.insertShares([share]);
    cy.loadApp();
    tab.inPost.focus();
    ui.inPost.list.all.awareApprove(post);
    ui.inPost.snap("user can aware approve");

    //can return
    cy.clearShareDb();
    share = createShare(post, lu, true, true);
    cy.insertShares([share]);
    cy.loadApp();
    tab.inPost.focus();
    ui.inPost.list.all.return(post);
    ui.inPost.snap("user can return borrow");
  });
});
