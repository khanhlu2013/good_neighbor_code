import { ObjectID } from "mongodb";
import { tab } from "../helper/ui.js";
import {
  createUser,
  createConnection,
  createPost,
  createShare
} from "../helper/model";

describe("notification", () => {
  const lu = createUser("Lu Tran", "lu@us.com");
  const tu = {
    id: new ObjectID(),
    email: "tu@pr.com",
    name: "Tu Nguyen"
  };

  describe("static display ui", () => {
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

    describe("my post", () => {
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

    describe("friend post", () => {
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

  describe("dynamic update ui", () => {
    describe("connection", () => {
      it("can update friend request ", () => {
        const connection = createConnection(tu, lu, true, undefined);
        cy.setupDb([lu, tu], [connection]);
        cy.loadApp();
        cy.login(lu.email);
        ui.tab.connection.focus();
        ui.connectionUi.inRequests_approve(0);
        ui.tab.connection.snap("update friend request");
      });
    });
  });

  // it("can update post request ", () => {
  //   const connection = {
  //     from: tu.id,
  //     to: lu.id,
  //     isApproveByTo: true,
  //     isApproveByFrom: true
  //   };
  //   const post = {
  //     id: new ObjectID(),
  //     user: lu.id,
  //     title: "t",
  //     description: "d",
  //     isActive: true
  //   };
  //   const share = {
  //     post,
  //     borrower: tu,
  //     isApprove: undefined
  //   };

  //   cy.setupDb([lu, tu], [connection], [post], [share]);
  //   cy.loadApp();
  //   cy.login(lu.email);
  //   ui.tab.outPost.focus();
  //   ui.outpostUi.table.decide(post);
  //   ui.outpostUi.decisionDialog.decide(tu, true);
  //   ui.outpostUi.decisionDialog.exit();
  //   ui.outpostUi.tab.snap("update post request");
  // });

  // it("can update unaware approve share", () => {
  //   const connection = {
  //     from: tu.id,
  //     to: lu.id,
  //     isApproveByTo: true,
  //     isApproveByFrom: true
  //   };
  //   const post = {
  //     id: new ObjectID(),
  //     user: lu.id,
  //     title: "t",
  //     description: "d",
  //     isActive: true
  //   };
  //   const share = {
  //     post,
  //     borrower: tu,
  //     isApprove: true,
  //     isAwareApprove: false,
  //     isReturn: false,
  //     isAwareReturn: false
  //   };

  //   cy.setupDb([lu, tu], [connection], [post], [share]);
  //   cy.loadApp();
  //   cy.login(tu.email);
  //   ui.tab.inPost.focus();
  //   ui.inPostUi.tab.all.awareApprove(post);
  //   ui.tab.inPost.snap("update unaware share");
  // });
});
