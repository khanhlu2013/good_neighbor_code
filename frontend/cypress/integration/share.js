const mongodb = require("mongodb");
const { ObjectID } = mongodb;
const { tree } = require("../helper.js");

describe("Share", () => {
  it("can request, approve, deny, return, and undo", () => {
    const me = {
      _id: new ObjectID(),
      email: "me@me.com",
      name: "Me Here"
    };
    const friend = {
      _id: new ObjectID(),
      email: "my@friend.com",
      name: "My Friend"
    };
    const stranger = {
      _id: new ObjectID(),
      email: "stranger@person.com",
      name: "Stranger Person"
    };
    const conn_me_friend = {
      from: friend._id,
      to: me._id,
      approvedByTo: true,
      approvedByFrom: true
    };
    const conn_friend_stranger = {
      from: friend._id,
      to: stranger._id,
      approvedByTo: true,
      approvedByFrom: true
    };

    const p1_friend = {
      user: friend._id,
      title: "Friend Post number 1",
      description: "Friend first post",
      isActive: true
    };
    const p2_friend = {
      user: friend._id,
      title: "Friend Post number 2",
      description: "Friend second post",
      isActive: true
    };

    const p_stranger = {
      user: stranger._id,
      title: "Stranger Post",
      description: "Stranger post description",
      isActive: true
    };

    const p_me = {
      user: me._id,
      title: "My Post",
      description: "My Post Description",
      isActive: true
    };

    cy.setupDB(
      [friend, stranger, me],
      [conn_me_friend, conn_friend_stranger],
      [p1_friend, p2_friend, p_stranger, p_me]
    );

    /*
      1. i see that there are 2 posts from friend, i borrow one, undo and borrow again
      2. stranger see that i am requesting, but no current borrowing, so she request too
      3. friend login:
        . approve stranger
        . undo stranger
        . approve me

      4. stranger see that i am borrowing it, color shoud change
      5. i see that i am borrowing and return it.
      6. stranger can see it is available again
      7. friend can see available color again to decide: deny it
      8. stranger just dont see that item anymore
      . friend undo deny
      . stranger see it is requesting again
    */

    cy.loadApp();

    //1.
    cy.login(me.email);
    tree.inPost.snap("app can display friend's InPosts: there are 2");
    tree.inPost.request(p2_friend);
    tree.inPost.snap("user can make a request from inPosts");
    tree.inPost.undoRequesting(p2_friend);
    tree.inPost.snap("user can undo a request");
    tree.inPost.request(p2_friend);

    //2.
    cy.switchUser(stranger.email);
    tree.inPost.snap("app can display requesting inPost");
    tree.inPost.request(p2_friend);
    tree.inPost.snap(
      "app can display inShareRequesting that how many requesting"
    );

    //3.
    cy.switchUser(friend.email);
    tree.outPost.snap("app can display outPosts with requesting info");
    tree.outPost.decide(p2_friend);
    tree.outPost.decisionDialog.snap(
      "app can show decide dialog with requesting users"
    );
    tree.outPost.decisionDialog.decide(stranger, true);
    tree.outPost.decisionDialog.snap("owner can approve a borrower");
    tree.outPost.decisionDialog.undoApprove();
    tree.outPost.decisionDialog.snap("owner can undo an approval");
    tree.outPost.decisionDialog.decide(me, true);
    tree.outPost.decisionDialog.exit();

    //4.
    cy.switchUser(stranger.email);
    tree.inPost.snap("app show requesting inPost with current borrowing user");

    //5.
    cy.switchUser(me.email);
    tree.inPost.snap("app show current borrowing list");
    tree.inPost.returnBorrowing(p2_friend);
    tree.inPost.snap("user can return a borrowing post");

    //6.
    cy.switchUser(stranger.email);
    tree.inPost.snap(
      "app can show available inPost after returned for borrower perspective"
    );

    //7.
    cy.switchUser(friend.email);
    tree.outPost.snap(
      "app can show available outPost after returned for owner perspective"
    );
    tree.outPost.decide(p2_friend);
    tree.outPost.decisionDialog.snap(
      "decision dialog no longer have a borrower"
    );
    tree.outPost.decisionDialog.decide(stranger, false);
    tree.outPost.decisionDialog.snap("decision dialog show can deny requester");
    tree.outPost.decisionDialog.exit();
    tree.outPost.snap("app show outPost with deny request info");

    //8.
    cy.switchUser(stranger.email);
    tree.inPost.snap("app hide deny requesting inPost");
  });
});
