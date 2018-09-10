const mongodb = require("mongodb");
const { ObjectID } = mongodb;
const { outPostTree } = require("../helper_outPost");
const { inPostTree } = require("../helper_inPost");

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
      description: "Super cool stuff!",
      isActive: true
    };
    const p2_friend = {
      user: friend._id,
      title: "Friend Post number 2",
      description: "Just stuff ...",
      isActive: true
    };

    const wantedPost = p1_friend;

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
      2. stranger see that i am requesting, so she request too
      3. friend login:
        . (notification show request)
        . approve stranger
        . undo stranger
        . approve me
        . (notification doesn't show request and table doesn't cause tention)

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
    inPostTree.snap("app can display friend's InPosts: there are 2");
    inPostTree.request(wantedPost);
    inPostTree.snap("user can make a request from inPosts");
    inPostTree.undoRequesting(wantedPost);
    inPostTree.snap("user can undo a request");
    inPostTree.request(wantedPost);

    //2.
    cy.switchUser(stranger.email);
    inPostTree.snap("app can display requesting inPost");
    inPostTree.request(wantedPost);
    inPostTree.snap(
      "app can display inShareRequesting that how many requesting"
    );

    //3.
    cy.switchUser(friend.email);
    outPostTree.tab.snap("outPost tab show requesting info");
    outPostTree.tab.focus();
    outPostTree.table.snap("outPost table show requesting info");

    outPostTree.table.decide(wantedPost);
    outPostTree.decisionDialog.snap(
      "app can show decide dialog with requesting users"
    );
    outPostTree.decisionDialog.decide(stranger, true);
    outPostTree.decisionDialog.snap(
      "decision dialog allow owner to approve requester"
    );
    outPostTree.decisionDialog.exit();
    outPostTree.table.snap("OutPost table can show approved requester");
    outPostTree.tab.snap(
      "OutPost notification is removed when requesting post get approved"
    );
    outPostTree.table.decide(wantedPost);
    outPostTree.decisionDialog.undoApprove();
    outPostTree.decisionDialog.snap(
      "decision dialog allow owner to undo an approval"
    );
    outPostTree.decisionDialog.decide(me, true);
    outPostTree.decisionDialog.exit();

    //4.
    cy.switchUser(stranger.email);
    inPostTree.snap("app show requesting inPost with current borrowing user");

    //5.
    cy.switchUser(me.email);
    inPostTree.snap("app show current borrowing list");
    inPostTree.returnBorrowing(wantedPost);
    inPostTree.snap("user can return a borrowing post");

    //6.
    cy.switchUser(stranger.email);
    inPostTree.snap(
      "app can show available inPost after returned for borrower perspective"
    );

    //7.
    cy.switchUser(friend.email);
    outPostTree.tab.focus();
    outPostTree.table.snap(
      "app can show available outPost after returned for owner perspective"
    );
    outPostTree.table.decide(wantedPost);
    outPostTree.decisionDialog.snap(
      "decision dialog no longer have a borrower"
    );
    outPostTree.decisionDialog.decide(stranger, false);
    outPostTree.decisionDialog.snap("decision dialog show can deny requester");
    outPostTree.decisionDialog.exit();
    outPostTree.table.snap("app show outPost with deny request info");

    //8.
    cy.switchUser(stranger.email);
    inPostTree.snap("app hide deny requesting inPost");
  });
});
