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

Cypress.Commands.add("switchAccount", email => {
  cy.logout();
  cy.login(email);
});

//Database related
Cypress.Commands.add("resetDB", email => {
  cy.exec(
    '~/mongo/bin/mongo good-neighboors-test --eval "db.users.deleteMany({})"'
  );
  cy.exec(
    `~/mongo/bin/mongo good-neighboors-test --eval 'db.connections.deleteMany({})'`
  );
});
Cypress.Commands.add("insertUserDB", users => {
  const userObjs = users
    .map(u => `{"email":"${u.email}","name":"${u.name}"}`)
    .join(",");

  cy.exec(
    `~/mongo/bin/mongo good-neighboors-test --eval 'db.users.insertMany([${userObjs}])'`
  );
});

require("@cypress/snapshot").register();
