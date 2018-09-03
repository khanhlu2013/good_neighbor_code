// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("loadApp", () => {
  cy.visit("http://localhost:3002");
});

Cypress.Commands.add("login", email => {
  cy.get("#dummy_login_email").type(`${email}{enter}`);
  cy.get("#PrivateApp-react").should("be.visible"); //wait for login
});

Cypress.Commands.add("logout", () => {
  cy.contains("logout").click();
});

Cypress.Commands.add("switchUser", email => {
  cy.logout();
  cy.login(email);
});

//Database related
Cypress.Commands.add("clearDB", email => {
  cy.exec(
    '~/mongo/bin/mongo good-neighboors-test --eval "db.users.deleteMany({})"'
  );
  cy.exec(
    `~/mongo/bin/mongo good-neighboors-test --eval 'db.connections.deleteMany({})'`
  );
  cy.exec(
    `~/mongo/bin/mongo good-neighboors-test --eval 'db.posts.deleteMany({})'`
  );
  cy.exec(
    `~/mongo/bin/mongo good-neighboors-test --eval 'db.shares.deleteMany({})'`
  );
});
Cypress.Commands.add("insertUsers", users => {
  const str = users
    .map(u => {
      let idStr = "";
      if (u._id) {
        idStr = `,"_id":ObjectId("${u._id.toHexString()}")`;
      }
      return `{"email":"${u.email}","name":"${u.name}"${idStr}}`;
    })
    .join(",");

  cy.exec(
    `~/mongo/bin/mongo good-neighboors-test --eval 'db.users.insertMany([${str}])'`
  );
});
Cypress.Commands.add("insertConnections", connections => {
  const str = connections
    .map(c => {
      let idStr = "";
      if (c._id) {
        idStr = `,"_id":ObjectId("${c._id.toHexString()}")`;
      }
      return `{"from":ObjectId("${c.from.toHexString()}"),"to":ObjectId("${c.to.toHexString()}"),"approvedByTo":${
        c.approvedByTo
      },"approvedByFrom":${c.approvedByFrom}${idStr}}`;
    })
    .join(",");

  cy.exec(
    `~/mongo/bin/mongo good-neighboors-test --eval 'db.connections.insertMany([${str}])'`
  );
});
Cypress.Commands.add("insertPosts", posts => {
  const str = posts
    .map(p => {
      let idStr = "";
      if (p._id) {
        idStr = `,"_id":ObjectId("${p._id.toHexString()}")`;
      }
      return `{"by":ObjectId("${p.by.toHexString()}"),"title":"${
        p.title
      }","description":"${p.description}","isActive":${p.isActive} ${idStr}}`;
    })
    .join(",");

  cy.exec(
    `~/mongo/bin/mongo good-neighboors-test --eval 'db.posts.insertMany([${str}])'`
  );
});
Cypress.Commands.add("setupDB", (users, connections, posts, shares) => {
  cy.clearDB();
  if (users && users.length !== 0) {
    cy.insertUsers(users);
  }
  if (connections && connections.length !== 0) {
    cy.insertConnections(connections);
  }
  if (posts && posts.length !== 0) {
    cy.insertPosts(posts);
  }
});
require("@cypress/snapshot").register();
