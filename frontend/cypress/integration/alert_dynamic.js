import { tab, ui } from "../helper/ui";
import {
  createConnection,
  createUser,
  createPost,
  createShare
} from "../helper/model";

describe("alert dynamic: alert info can update accordingly to user dynamic interaction", () => {
  const lu = createUser("Lu Tran", "lu@us.com");
  const tu = createUser("Tu Nguyen", "tu@pr.com");

  describe("connection", () => {
    it("can update friend request ", () => {
      const connection = createConnection(tu, lu, true, undefined);
      cy.setupDb([lu, tu], [connection]);
      cy.loadApp();
      cy.login(lu.email);
      tab.connection.focus();
      tab.connection.inConnection.focus();
      tab.connection.snap("before - appHeaderTabBar");
      tab.connection.inConnection.snap("before - appBodyTabBar");
      ui.connection.inRequests_approve(0);
      tab.connection.snap("after - appHeaderTabBar");
      tab.connection.inConnection.snap("after - appBodyTabBar");
    });
  });

  describe("outPost", () => {
    it("can update request", () => {
      const connection = createConnection(tu, lu, true, true);
      const post = createPost(lu, "ttt", "ddd");
      const share = createShare(post, tu);
      cy.setupDb([lu, tu], [connection], [post], [share]);
      cy.loadApp();
      cy.login(lu.email);
      tab.outPost.focus();
      tab.outPost.snap("before - appHeaderTabBar");
      tab.outPost.request.snap("before - appBodyTabBar");

      tab.outPost.request.focus();
      ui.outPost.list.requestNote.decide(post);
      ui.outPost.decisionDialog.decide(tu, true);
      ui.outPost.decisionDialog.exit();

      tab.outPost.snap("after - appHeaderTabBar");
      tab.outPost.request.snap("after - appBodyTabBar");
    });

    it("can update unaware return", () => {
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
      tab.outPost.snap("before - appHeaderTabBar");
      tab.outPost.return.snap("before - appBodyTabBar");

      tab.outPost.return.focus();
      ui.outPost.list.returnNote.awareReturn(post);
      tab.outPost.snap("after - appHeaderTabBar");
      tab.outPost.return.snap("after - appBodyTabBar");
    });
  });

  describe("inPost", () => {
    it("can update approve post", () => {
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
      tab.inPost.approve.focus();
      tab.inPost.snap("before - appHeaderTabBar");
      tab.inPost.approve.snap("before - appBodyTabBar");
      ui.inPost.list.approveNote.awareApprove(post);
      tab.inPost.snap("after - appHeaderTabBar");
      tab.inPost.approve.snap("after - appBodyTabBar");
    });
  });
});
