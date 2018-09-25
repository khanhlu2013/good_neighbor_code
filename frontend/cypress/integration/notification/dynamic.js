import { tab } from "../../helper/ui";
import { createConnection, createUser } from "../../helper/model";

describe("notification dynamic update ui", () => {
  const lu = createUser("Lu Tran", "lu@us.com");
  const tu = createUser("Tu Nguyen", "tu@pr.com");

  describe("connection", () => {
    it("can update friend request ", () => {
      const connection = createConnection(tu, lu, true, undefined);
      cy.setupDb([lu, tu], [connection]);
      cy.loadApp();
      cy.login(lu.email);
      tab.connection.focus();

      // ui.connectionUi.inRequests_approve(0);
      // ui.tab.connection.snapRightAway("update friend request");
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
