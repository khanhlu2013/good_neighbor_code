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

import "../helper/db";

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

require("@cypress/snapshot").register();
