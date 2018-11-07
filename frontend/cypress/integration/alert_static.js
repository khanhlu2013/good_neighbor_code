import { tab } from "../helper/ui.js";
import {
  createUser,
  createConnection,
  createPost,
  createShare
} from "../helper/model.js";

describe("alert static: can display static data correctly without user dynamic interaction", () => {
  const lu = createUser("Lu Tran", "lu@us.com");
  const tu = createUser("Tu Nguyen", "tu@pr.com");

  describe("connection", () => {
    it("can show friend request", () => {
      //friend request
      const connection = createConnection(tu, lu, true, undefined);

      cy.setupDb([lu, tu], [connection]);
      cy.loadApp();
      cy.login(lu.email);

      tab.connection.focus();
      tab.connection.snap("can show friend request - appHeaderTabBar");
      tab.connection.inConnection.snap(
        "can show friend request - appBodyTabBar"
      );
    });
  });

  describe("out post", () => {
    it("can show request", () => {
      const connection = createConnection(tu, lu, true, true);
      const post = createPost(lu, "title", "description");
      const share = createShare(post, tu);
      cy.setupDb([lu, tu], [connection], [post], [share]);
      cy.loadApp();
      cy.login(lu.email);
      tab.outPost.focus();
      tab.outPost.snap("can show post request - appHeaderTabBar");
      tab.outPost.request.snap("can show post request - appBodyTabBar");
    });
    it("can show unaware return", () => {
      const connection = createConnection(tu, lu, true, true);
      const post = createPost(lu, "title", "description");
      const isApprove = true;
      const isAwareApprove = true;
      const isReturn = true;
      const isAwareReturn = false;
      const dateReturn = new Date();
      const share = createShare(
        post,
        tu,
        isApprove,
        isAwareApprove,
        isReturn,
        isAwareReturn,
        dateReturn
      );
      cy.setupDb([lu, tu], [connection], [post], [share]);
      cy.loadApp();
      cy.login(lu.email);
      tab.outPost.focus();
      tab.outPost.snap("can show unaware return - appHeaderTabBar");
      tab.outPost.return.snap("can show unaware return - appBodyTabBar");
    });
    it("can show combine request and unaware return", () => {
      const connection = createConnection(tu, lu, true, true);
      const requestPost = createPost(lu, "title", "description");
      const requestShare = createShare(requestPost, tu);
      const returnPost = createPost(lu, "title", "description");
      const isApprove = true;
      const isAwareApprove = true;
      const isReturn = true;
      const isAwareReturn = false;
      const dateReturn = new Date();
      const returnShare = createShare(
        returnPost,
        tu,
        isApprove,
        isAwareApprove,
        isReturn,
        isAwareReturn,
        dateReturn
      );
      cy.setupDb(
        [lu, tu],
        [connection],
        [requestPost, returnPost],
        [requestShare, returnShare]
      );
      cy.loadApp();
      cy.login(lu.email);
      tab.outPost.focus();
      tab.outPost.snap(
        "can show combine alert for request and unawareReturn - appHeaderTabBar"
      );
      tab.outPost.request.snap(
        "can show separate alert for request - appBodyTabBar"
      );
      tab.outPost.return.snap(
        "can show separate alert for unAwareReturn - appBodyTabBar"
      );
    });
  });

  describe("in post", () => {
    it("can show approve post", () => {
      const connection = createConnection(tu, lu, true, true);
      const post = createPost(tu, "title", "description");
      const isApprove = true;
      const isAwareApprove = false;
      const isReturn = false;
      const isAwareReturn = false;
      const dateReturn = null;
      const share = createShare(
        post,
        lu,
        isApprove,
        isAwareApprove,
        isReturn,
        isAwareReturn,
        dateReturn
      );

      cy.setupDb([lu, tu], [connection], [post], [share]);
      cy.loadApp();
      cy.login(lu.email);

      tab.inPost.focus();
      tab.inPost.snap("can show alert for approve post - appHeaderTabBar");
      tab.inPost.approve.snap(
        "can show alert for approve post - appBodyTabBar"
      );
    });
  });
});
