import { tab } from "../helper/ui.js";
import {
  createUser,
  createConnection,
  createPost,
  createShare
} from "../helper/model.js";

describe("notification static", () => {
  const lu = createUser("Lu Tran", "lu@us.com");
  const tu = createUser("Tu Nguyen", "tu@pr.com");

  describe("connection", () => {
    it("can show friend request", () => {
      //friend request
      const connection = createConnection(tu, lu, true, undefined);

      cy.setupDb([lu, tu], [connection]);
      cy.loadApp();
      cy.login(lu.email);

      tab.connection.snap();
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
      tab.outPost.snap("master");
      tab.outPost.waitingList.snap("request");
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
      tab.outPost.snap("master");
      tab.outPost.return.snap("return");
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
      tab.outPost.snap("master");
      tab.outPost.waitingList.snap("request");
      tab.outPost.return.snap("return");
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
      tab.inPost.snap("master");
      tab.inPost.approve.snap("approve");
    });
  });
});
