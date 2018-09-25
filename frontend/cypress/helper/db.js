Cypress.Commands.add("setupDb", (users, connections, posts, shares) => {
  cy.clearAllDb();
  cy.insertUsers(users);
  cy.insertConnections(connections);
  cy.insertPosts(posts);
  cy.insertShares(shares);
});

Cypress.Commands.add("clearAllDb", email => {
  cy.clearUserDb();
  cy.clearConnectionDb();
  cy.clearPostDb();
  cy.clearShareDb();
});

Cypress.Commands.add("clearUserDb", email => {
  cy.exec(
    '~/mongo/bin/mongo good-neighboors-test --eval "db.users.deleteMany({})"'
  );
});

Cypress.Commands.add("clearConnectionDb", email => {
  cy.exec(
    `~/mongo/bin/mongo good-neighboors-test --eval 'db.connections.deleteMany({})'`
  );
});

Cypress.Commands.add("clearPostDb", email => {
  cy.exec(
    `~/mongo/bin/mongo good-neighboors-test --eval 'db.posts.deleteMany({})'`
  );
});

Cypress.Commands.add("clearShareDb", email => {
  cy.exec(
    `~/mongo/bin/mongo good-neighboors-test --eval 'db.shares.deleteMany({})'`
  );
});

// Collection level
Cypress.Commands.add("insertUsers", users => {
  if (!users || users.length === 0) {
    return;
  }

  const str = users
    .map(u => {
      let idStr = "";
      if (u.id) {
        idStr = `,"_id":ObjectId("${u.id}")`;
      }
      return `{"email":"${u.email}","name":"${u.name}"${idStr}}`;
    })
    .join(",");

  cy.exec(
    `~/mongo/bin/mongo good-neighboors-test --eval 'db.users.insertMany([${str}])'`
  );
});

Cypress.Commands.add("insertConnections", connections => {
  if (!connections || connections.length === 0) {
    return;
  }
  const str = connections
    .map(c => {
      let idStr = "";
      if (c.id) {
        idStr = `,"_id":ObjectId("${c.id}")`;
      }
      return `{"from":ObjectId("${c.from.id}"),"to":ObjectId("${
        c.to.id
      }"),"isApproveByTo":${c.isApproveByTo},"isApproveByFrom":${
        c.isApproveByFrom
      }${idStr}}`;
    })
    .join(",");

  cy.exec(
    `~/mongo/bin/mongo good-neighboors-test --eval 'db.connections.insertMany([${str}])'`
  );
});

Cypress.Commands.add("insertPosts", posts => {
  if (!posts || posts.length === 0) {
    return;
  }
  const str = posts
    .map(p => {
      let idStr = "";
      if (p.id) {
        idStr = `,"_id":ObjectId("${p.id}")`;
      }
      return `{"user":ObjectId("${p.user.id}"),"title":"${
        p.title
      }","description":"${
        p.description
      }","isActive":${p.isActive.toString()}, "dateCreate":new Date(${p.dateCreate.getTime()}) ${idStr}}`;
    })
    .join(",");

  cy.exec(
    `~/mongo/bin/mongo good-neighboors-test --eval 'db.posts.insertMany([${str}])'`
  );
});

Cypress.Commands.add("insertShares", shares => {
  if (!shares || shares.length === 0) {
    return;
  }
  const str = shares
    .map(s => {
      let idStr = "";
      let dateReturnStr = "";
      if (s.id) {
        idStr = `,"_id":ObjectId("${s.id}")`;
      }
      if (s.dateReturn) {
        dateReturnStr = `,"dateReturn": new Date("${s.dateReturn.getTime()}")`;
      }
      return `{"post":ObjectId("${s.post.id}"),"borrower":ObjectId("${
        s.borrower.id
      }"),"isApprove":${s.isApprove},"isReturn":${s.isReturn},"isAwareReturn":${
        s.isAwareReturn
      },"dateCreate":new Date(${s.dateCreate.getTime()}), "isAwareApprove":${
        s.isAwareApprove
      } ${dateReturnStr} ${idStr}}`;
    })
    .join(",");
  cy.exec(
    `~/mongo/bin/mongo good-neighboors-test --eval 'db.shares.insertMany([${str}])'`
  );
});
